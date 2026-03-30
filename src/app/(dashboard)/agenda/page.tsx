"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Calculator,
  Microscope,
  Globe,
  BookOpen,
  AlertTriangle,
  Clock,
  Users,
  FileText,
  Bot,
  ChevronRight,
  X,
  Hand,
  Eye,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  agendaCourses,
  agendaSessions,
  agendaAlerts,
  agendaWeekDays,
  agendaTimeSlots,
  type AgendaSession,
  type AgendaCourse,
} from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Calculator,
  Microscope,
  Globe,
  BookOpen,
};

function CourseSelector({
  courses,
  selected,
  onSelect,
}: {
  courses: AgendaCourse[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
      {courses.map((course, i) => {
        const Icon = iconMap[course.icon] || BookOpen;
        const isSelected = selected === course.id;
        return (
          <motion.button
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onSelect(isSelected ? null : course.id)}
            className={`
              relative min-w-[200px] flex-shrink-0 rounded-2xl p-[3px] transition-all
              bg-gradient-to-br ${course.gradient}
              ${isSelected ? "ring-4 ring-[#ffc107]/50 scale-[1.02]" : "hover:scale-[1.01]"}
            `}
          >
            <div className="rounded-[13px] bg-white p-4 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: course.color + "20" }}
                >
                  <Icon className="w-5 h-5" style={{ color: course.color }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {course.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.completedSessions}/{course.totalSessions} sesiones
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: course.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {course.progress}%
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function SessionCell({
  session,
  onClick,
}: {
  session: AgendaSession;
  onClick: (s: AgendaSession) => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(session)}
      className="w-full text-left rounded-xl p-2.5 border-2 transition-shadow hover:shadow-md"
      style={{
        backgroundColor: session.color + "15",
        borderColor: session.color + "40",
      }}
    >
      <p
        className="text-xs font-bold truncate leading-tight"
        style={{ color: session.color }}
      >
        {session.topic}
      </p>
      <div className="flex items-center gap-1.5 mt-1.5">
        {session.volunteer ? (
          <div className="flex items-center gap-1">
            <Avatar size="sm">
              <AvatarFallback className="text-[9px] bg-white font-bold" style={{ color: session.color }}>
                {session.volunteer.avatar}
              </AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-gray-600 truncate">
              {session.volunteer.name.split(" ")[0]}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] text-amber-600 font-medium">
              Sin asignar
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-gray-400">
          {session.startHour}:00 - {session.endHour}:00
        </span>
        {session.hasAIFallback && (
          <span className="inline-flex items-center gap-0.5 text-[9px] text-[#7c4dff] bg-[#7c4dff]/10 rounded-full px-1.5 py-0.5 font-medium">
            <Bot className="w-2.5 h-2.5" />
            IA
          </span>
        )}
      </div>
    </motion.button>
  );
}

function SessionDetailCard({
  session,
  onClose,
  isVolunteerView,
}: {
  session: AgendaSession;
  onClose: () => void;
  isVolunteerView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg shadow-2xl border-0"
        style={{ boxShadow: `0 0 0 2px ${session.color}30` }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="relative pb-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-12 rounded-full"
              style={{ backgroundColor: session.color }}
            />
            <div>
              <CardTitle className="text-lg">{session.topic}</CardTitle>
              <p className="text-sm text-gray-500">
                {session.day} {session.startHour}:00 - {session.endHour}:00
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">{session.description}</p>

          {/* Volunteer */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
            <div className="flex items-center gap-2">
              {session.volunteer ? (
                <>
                  <Avatar>
                    <AvatarFallback
                      className="font-bold text-white text-xs"
                      style={{ backgroundColor: session.color }}
                    >
                      {session.volunteer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {session.volunteer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Voluntario asignado
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-700">
                      Sin voluntario asignado
                    </p>
                    <p className="text-xs text-gray-500">
                      Se necesita un voluntario
                    </p>
                  </div>
                </>
              )}
            </div>
            {!session.volunteer && isVolunteerView && (
              <Button
                size="sm"
                className="bg-[#4caf50] hover:bg-[#43a047] text-white rounded-xl"
              >
                <Hand className="w-3.5 h-3.5 mr-1" />
                Reclamar
              </Button>
            )}
          </div>

          {/* Materials */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Materiales precargados
            </p>
            <div className="space-y-1.5">
              {session.materials.map((mat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700 p-2 rounded-lg bg-gray-50"
                >
                  <FileText
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: session.color }}
                  />
                  {mat}
                </div>
              ))}
            </div>
          </div>

          {/* Previous Summary */}
          <div className="p-3 rounded-xl bg-[#e3e2de]/50 border border-[#e3e2de]">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Resumen de sesiones anteriores
            </p>
            <p className="text-sm text-gray-700">{session.previousSummary}</p>
          </div>

          {/* Footer info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {session.attendeeCount} asistentes
            </div>
            {session.hasAIFallback && (
              <div className="flex items-center gap-1 text-[#7c4dff]">
                <Bot className="w-3.5 h-3.5" />
                IA disponible como respaldo
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CalendarGrid({
  sessions,
  selectedCourse,
  onSessionClick,
}: {
  sessions: AgendaSession[];
  selectedCourse: string | null;
  onSessionClick: (s: AgendaSession) => void;
}) {
  const filtered = selectedCourse
    ? sessions.filter((s) => s.courseId === selectedCourse)
    : sessions;

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-px bg-gray-200 rounded-2xl overflow-hidden min-w-[700px]"
        style={{
          gridTemplateColumns: "64px repeat(5, 1fr)",
          gridTemplateRows: `40px repeat(${agendaTimeSlots.length}, 72px)`,
        }}
      >
        {/* Header: empty corner */}
        <div className="bg-[#e3e2de] flex items-center justify-center">
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
        {/* Day headers */}
        {agendaWeekDays.map((day) => (
          <div
            key={day}
            className="bg-[#e3e2de] flex items-center justify-center text-sm font-bold text-gray-700"
          >
            {day}
          </div>
        ))}

        {/* Time rows */}
        {agendaTimeSlots.map((hour) => (
          <Fragment key={`row-${hour}`}>
            {/* Time label */}
            <div
              className="bg-white flex items-center justify-center text-xs text-gray-400 font-medium"
            >
              {hour}:00
            </div>
            {/* Day cells */}
            {agendaWeekDays.map((day, dayIdx) => {
              const session = filtered.find(
                (s) => s.dayIndex === dayIdx && s.startHour === hour
              );
              return (
                <div
                  key={`${day}-${hour}`}
                  className="bg-white p-1 flex items-stretch"
                >
                  {session ? (
                    <SessionCell session={session} onClick={onSessionClick} />
                  ) : null}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function AlertsSection() {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        Alertas
      </h3>
      {agendaAlerts.map((alert, i) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="border-amber-200 bg-amber-50/80 ring-0 ring-amber-200/50">
            <CardContent className="flex items-start gap-3 py-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">
                  {alert.message}
                </p>
                <p className="text-xs text-amber-600 mt-0.5">
                  Faltan {alert.hoursUntil} horas para la sesion
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100 rounded-xl"
              >
                Ver
                <ChevronRight className="w-3 h-3" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default function AgendaPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<AgendaSession | null>(
    null
  );
  const [isVolunteerView, setIsVolunteerView] = useState(false);

  return (
    <div className="min-h-screen bg-[#e3e2de]/30 p-4 md:p-8 space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
            >
              <CalendarDays className="w-8 h-8 text-[#1351aa]" />
            </motion.div>
            Agenda Colaborativa
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles className="w-5 h-5 text-[#ffc107]" />
            </motion.div>
          </h1>
          <p className="text-gray-500 mt-1">
            Planifica, organiza y reclama sesiones de tutoria
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 bg-white rounded-2xl p-1 shadow-sm border">
          <Button
            variant={!isVolunteerView ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsVolunteerView(false)}
            className={`rounded-xl ${!isVolunteerView ? "bg-[#1351aa] text-white" : ""}`}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Vista Estudiante
          </Button>
          <Button
            variant={isVolunteerView ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsVolunteerView(true)}
            className={`rounded-xl ${isVolunteerView ? "bg-[#4caf50] text-white" : ""}`}
          >
            <Hand className="w-3.5 h-3.5 mr-1" />
            Vista Voluntario
          </Button>
        </div>
      </motion.div>

      {/* Course Selector */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
          Cursos disponibles
        </h2>
        <CourseSelector
          courses={agendaCourses}
          selected={selectedCourse}
          onSelect={setSelectedCourse}
        />
      </motion.section>

      {/* Calendar + Alerts layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Calendar View */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-3xl overflow-hidden ring-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="w-5 h-5 text-[#1351aa]" />
                Semana Actual
                {selectedCourse && (
                  <Badge
                    className="ml-2 rounded-xl text-white text-xs"
                    style={{
                      backgroundColor: agendaCourses.find(
                        (c) => c.id === selectedCourse
                      )?.color,
                    }}
                  >
                    {agendaCourses.find((c) => c.id === selectedCourse)?.name}
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="ml-1 hover:text-white/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarGrid
                sessions={agendaSessions}
                selectedCourse={selectedCourse}
                onSessionClick={setSelectedSession}
              />
            </CardContent>
          </Card>

          {/* Volunteer-specific: availability slots */}
          {isVolunteerView && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4"
            >
              <Card className="rounded-3xl ring-0 shadow-sm border-[#4caf50]/20 bg-[#4caf50]/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-[#4caf50]">
                    <Hand className="w-5 h-5" />
                    Sesiones disponibles para reclamar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agendaSessions
                      .filter((s) => !s.volunteer)
                      .map((session, i) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#4caf50]/20"
                        >
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {session.topic}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session.day} {session.startHour}:00 -{" "}
                              {session.endHour}:00
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-[#4caf50] hover:bg-[#43a047] text-white rounded-xl"
                          >
                            <Hand className="w-3 h-3 mr-1" />
                            Reclamar Sesion
                          </Button>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.section>

        {/* Right sidebar: Alerts + AI fallback info */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <AlertsSection />

          {/* AI fallback indicator section */}
          <Card className="rounded-3xl ring-0 shadow-sm bg-[#7c4dff]/5 border-[#7c4dff]/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#7c4dff]">
                <Bot className="w-5 h-5" />
                Maestro Virtual IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Las sesiones marcadas con{" "}
                <Badge className="bg-[#7c4dff]/10 text-[#7c4dff] rounded-full text-[10px] px-2">
                  <Bot className="w-2.5 h-2.5 mr-0.5" />
                  IA
                </Badge>{" "}
                tienen respaldo de inteligencia artificial.
              </p>
              <p className="text-xs text-gray-500">
                Si un voluntario no puede asistir, la IA tomara el control
                temporalmente para que los estudiantes no pierdan su sesion.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse" />
                <span className="text-xs text-[#4caf50] font-medium">
                  Sistema activo y listo
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick stats */}
          <Card className="rounded-3xl ring-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Esta semana</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Sesiones",
                  value: agendaSessions.length,
                  color: "#1351aa",
                },
                {
                  label: "Con voluntario",
                  value: agendaSessions.filter((s) => s.volunteer).length,
                  color: "#4caf50",
                },
                {
                  label: "Sin asignar",
                  value: agendaSessions.filter((s) => !s.volunteer).length,
                  color: "#ff8c42",
                },
                {
                  label: "Con IA",
                  value: agendaSessions.filter((s) => s.hasAIFallback).length,
                  color: "#7c4dff",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="p-3 rounded-xl text-center"
                  style={{ backgroundColor: stat.color + "10" }}
                >
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.aside>
      </div>

      {/* Session Detail Modal */}
      <AnimatePresence>
        {selectedSession && (
          <SessionDetailCard
            session={selectedSession}
            onClose={() => setSelectedSession(null)}
            isVolunteerView={isVolunteerView}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
