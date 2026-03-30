"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Globe,
  Clock,
  Star,
  MessageSquare,
  Filter,
  Users,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Languages,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  matchVolunteers,
  matchStudentsWaiting,
  matchResultsData,
  matchingStatsData,
  subjects,
  getSubjectColor,
} from "@/lib/mock-data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

function CompatibilityCircle({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#4caf50" : score >= 60 ? "#ffc107" : "#ff5252";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="#e3e2de" strokeWidth="6" />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform="rotate(-90 44 44)"
        />
      </svg>
      <span className="absolute text-lg font-bold" style={{ color }}>
        {score}%
      </span>
    </div>
  );
}

export default function MatchingPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(3);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSubject = (s: string) =>
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Sparkles className="size-7 text-[#7c4dff]" />
            Matching Inteligente
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Nuestro algoritmo conecta a los voluntarios ideales con cada estudiante
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 rounded-xl"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="size-4" /> Filtros
        </Button>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Matches esta semana", value: matchingStatsData.totalMatchesThisWeek, icon: Heart, color: "#ff6b9d", bg: "bg-pink-50" },
          { label: "Compatibilidad promedio", value: `${matchingStatsData.averageCompatibility}%`, icon: Zap, color: "#ffc107", bg: "bg-amber-50" },
          { label: "Tiempo de respuesta", value: matchingStatsData.averageResponseTime, icon: Clock, color: "#4caf50", bg: "bg-green-50" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex size-12 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className="size-6" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Filters (collapsible) */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Materias</p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => toggleSubject(s.label)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        selectedSubjects.includes(s.label)
                          ? "text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      style={
                        selectedSubjects.includes(s.label)
                          ? { backgroundColor: s.color }
                          : undefined
                      }
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Calificacion minima: {minRating} estrellas
                  </p>
                  <Slider
                    value={[minRating]}
                    min={1}
                    max={5}
                    step={0.5}
                    onValueChange={(val) => setMinRating(Array.isArray(val) ? val[0] : val)}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch />
                  <span className="text-sm text-gray-600">Solo con disponibilidad inmediata</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Matching Visualization */}
      <motion.div variants={item}>
        <Card className="overflow-hidden rounded-2xl border-none shadow-sm">
          <CardHeader className="border-b bg-gradient-to-r from-[#1351aa]/5 to-[#7c4dff]/5 pb-3">
            <CardTitle className="text-base">Mejores Coincidencias para Ti</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matchVolunteers.slice(0, 6).map((vol, i) => {
                const result = matchResultsData[i] || matchResultsData[0];
                return (
                  <motion.div
                    key={vol.id}
                    variants={item}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <Card className="group relative overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg">
                      {/* Compatibility score */}
                      <div className="flex items-start gap-4 p-4">
                        <CompatibilityCircle score={result.compatibility} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-8">
                              <AvatarImage src={vol.avatar} />
                              <AvatarFallback>{vol.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-gray-900">
                                {vol.name}
                              </p>
                              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Globe className="size-3" />
                                {vol.country} {vol.flag}
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star
                                key={j}
                                className={`size-3 ${j < Math.floor(vol.rating) ? "fill-current" : "text-gray-200"}`}
                              />
                            ))}
                            <span className="ml-1 text-gray-500">{vol.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 px-4 pb-2">
                        {vol.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="rounded-full text-[10px]"
                            style={{
                              backgroundColor: getSubjectColor(skill) + "20",
                              color: getSubjectColor(skill),
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Match reasons */}
                      <div className="space-y-1 border-t bg-gray-50/50 px-4 py-3">
                        {result.reasons.slice(0, 2).map((reason, ri) => (
                          <p key={ri} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                            <CheckCircle2 className="size-3 text-green-500" />
                            {reason}
                          </p>
                        ))}
                      </div>

                      {/* Availability bar */}
                      <div className="px-4 pb-3">
                        <p className="mb-1 text-[10px] font-medium text-gray-500">
                          <Clock className="mr-1 inline size-3" />
                          {vol.timezone} &middot; {vol.availability.length} dias/sem
                        </p>
                        <div className="flex gap-0.5">
                          {["L", "M", "X", "J", "V", "S", "D"].map((d, di) => (
                            <div
                              key={d}
                              className={`flex-1 rounded-sm py-0.5 text-center text-[9px] font-medium ${
                                di < 5
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Connect button */}
                      <div className="px-4 pb-4">
                        <Button
                          size="sm"
                          className="w-full gap-2 rounded-xl bg-[#1351aa] hover:bg-[#1351aa]/90"
                        >
                          <MessageSquare className="size-4" /> Conectar
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Priority queue */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader className="border-b pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-5 text-[#ff8c42]" />
              Estudiantes Esperando
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y p-0">
            {matchStudentsWaiting.map((student) => (
              <div key={student.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-gray-50/50">
                <Avatar className="size-10">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                    {student.hasAccessibilityNeeds && student.accessibilityNote && (
                      <Badge variant="outline" className="rounded-full border-purple-200 bg-purple-50 text-[10px] text-purple-700">
                        {student.accessibilityNote}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{student.needs.join(", ")}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="secondary"
                    className="rounded-full text-[10px]"
                    style={{
                      backgroundColor: getSubjectColor(student.subject) + "20",
                      color: getSubjectColor(student.subject),
                    }}
                  >
                    {student.subject}
                  </Badge>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="size-3" />
                    {student.waitTime}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="gap-1 rounded-xl text-xs">
                  Asignar <ArrowRight className="size-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
