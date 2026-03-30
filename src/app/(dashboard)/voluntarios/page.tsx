"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Loader2,
  Circle,
  Upload,
  Plus,
  X,
  Star,
  Play,
  UserCheck,
  FileText,
  Shield,
  BookOpen,
  Award,
  MapPin,
  Users,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  onboardingSteps,
  skillOptions,
  trainingVideos,
  volunteerReviews,
  ratingBreakdown,
  volunteerDirectory,
} from "@/lib/mock-data";

// ----------------------------------------------------------------
// Onboarding Stepper
// ----------------------------------------------------------------

const stepIcons: Record<number, React.ElementType> = {
  1: UserCheck,
  2: FileText,
  3: Shield,
  4: BookOpen,
  5: Award,
};

function OnboardingStepper() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between gap-2 min-w-[640px] px-2">
        {onboardingSteps.map((step, i) => {
          const Icon = stepIcons[step.id];
          const isCompleted = step.status === "completed";
          const isActive = step.status === "in-progress";

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-1.5 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex size-12 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted
                      ? "border-[#4caf50] bg-[#4caf50] text-white"
                      : isActive
                        ? "border-[#1351aa] bg-[#1351aa]/10 text-[#1351aa]"
                        : "border-gray-300 bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="size-5" strokeWidth={3} />
                  ) : isActive ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Icon className="size-5" />
                  )}
                  {isActive && (
                    <span className="absolute -right-0.5 -top-0.5 flex size-3">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#1351aa] opacity-75" />
                      <span className="relative inline-flex size-3 rounded-full bg-[#1351aa]" />
                    </span>
                  )}
                </motion.div>
                <span
                  className={`text-xs font-semibold leading-tight ${
                    isCompleted
                      ? "text-[#4caf50]"
                      : isActive
                        ? "text-[#1351aa]"
                        : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight max-w-[100px]">
                  {step.description}
                </span>
              </div>

              {/* Connector line */}
              {i < onboardingSteps.length - 1 && (
                <div className="mx-2 h-0.5 flex-1 rounded-full bg-gray-200">
                  <motion.div
                    className={`h-full rounded-full ${isCompleted ? "bg-[#4caf50]" : "bg-gray-200"}`}
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ delay: i * 0.15, duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// Skills Tag Input
// ----------------------------------------------------------------

function SkillsSection() {
  const [selected, setSelected] = useState<string[]>([
    "Matemáticas",
    "Programación Python",
  ]);
  const [proficiency, setProficiency] = useState<Record<string, string>>({
    Matemáticas: "Avanzado",
    "Programación Python": "Intermedio",
  });

  const addSkill = (skill: string) => {
    if (!selected.includes(skill)) {
      setSelected([...selected, skill]);
      setProficiency({ ...proficiency, [skill]: "Intermedio" });
    }
  };

  const removeSkill = (skill: string) => {
    setSelected(selected.filter((s) => s !== skill));
    const next = { ...proficiency };
    delete next[skill];
    setProficiency(next);
  };

  const cycleProficiency = (skill: string) => {
    const levels = ["Básico", "Intermedio", "Avanzado"];
    const current = levels.indexOf(proficiency[skill]);
    setProficiency({
      ...proficiency,
      [skill]: levels[(current + 1) % levels.length],
    });
  };

  const proficiencyColors: Record<string, string> = {
    Básico: "bg-[#ffc107]/15 text-[#b8860b] border-[#ffc107]/30",
    Intermedio: "bg-[#1351aa]/10 text-[#1351aa] border-[#1351aa]/30",
    Avanzado: "bg-[#4caf50]/10 text-[#4caf50] border-[#4caf50]/30",
  };

  return (
    <div className="space-y-3">
      {/* Selected skills */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {selected.map((skill) => (
            <motion.div
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${proficiencyColors[proficiency[skill]]}`}
            >
              <span>{skill}</span>
              <button
                onClick={() => cycleProficiency(skill)}
                className="rounded-full px-1 py-0.5 text-[10px] font-bold underline underline-offset-2 hover:opacity-70"
              >
                {proficiency[skill]}
              </button>
              <button
                onClick={() => removeSkill(skill)}
                className="ml-0.5 rounded-full hover:opacity-70"
              >
                <X className="size-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Available skills */}
      <div className="flex flex-wrap gap-1.5">
        {skillOptions
          .filter((s) => !selected.includes(s))
          .map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-gray-300 px-2.5 py-1 text-xs text-gray-500 transition-colors hover:border-[#1351aa] hover:text-[#1351aa]"
            >
              <Plus className="size-3" />
              {skill}
            </button>
          ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// Star display
// ----------------------------------------------------------------

function Stars({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < Math.round(rating) ? "text-[#ffc107]" : "text-gray-200"}
          fill={i < Math.round(rating) ? "#ffc107" : "none"}
          size={size}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------
// Status badge
// ----------------------------------------------------------------

const statusStyles: Record<string, string> = {
  Verificado: "bg-[#4caf50]/15 text-[#4caf50]",
  "En Proceso": "bg-[#ffc107]/15 text-[#b8860b]",
  Suspendido: "bg-red-100 text-red-600",
};

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------

export default function VoluntariosPage() {
  const [bgCheck] = useState<"Verificando..." | "Aprobado" | "Rechazado">(
    "Verificando..."
  );

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Verificación de Voluntarios
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestiona el proceso de onboarding y verificación de voluntarios.
        </p>
      </div>

      {/* ---- Onboarding Progress ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Progreso de Onboarding
        </h2>
        <Card className="p-6">
          <OnboardingStepper />
        </Card>
      </section>

      {/* ---- Verification Forms ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Formulario de Verificación
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Perfil Profesional */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="size-4 text-[#1351aa]" />
                  Perfil Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Photo upload */}
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#e3e2de] text-gray-400">
                    <Upload className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Foto de perfil</p>
                    <Button variant="outline" size="sm">
                      Subir foto
                    </Button>
                  </div>
                </div>
                {/* Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Nombre Completo
                    </label>
                    <input
                      className="mt-1 h-9 w-full rounded-xl border bg-white px-3 text-sm outline-none focus:border-[#1351aa]/40 focus:ring-2 focus:ring-[#1351aa]/10"
                      defaultValue="Carlos Méndez"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Profesión
                    </label>
                    <input
                      className="mt-1 h-9 w-full rounded-xl border bg-white px-3 text-sm outline-none focus:border-[#1351aa]/40 focus:ring-2 focus:ring-[#1351aa]/10"
                      defaultValue="Ingeniero de Software"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Educación
                    </label>
                    <input
                      className="mt-1 h-9 w-full rounded-xl border bg-white px-3 text-sm outline-none focus:border-[#1351aa]/40 focus:ring-2 focus:ring-[#1351aa]/10"
                      defaultValue="Maestría en Ciencias de la Computación"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Biografía
                    </label>
                    <textarea
                      rows={3}
                      className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:border-[#1351aa]/40 focus:ring-2 focus:ring-[#1351aa]/10"
                      defaultValue="Apasionado por la educación y la tecnología. Voluntario desde 2024."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documento de Identidad */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-4 text-[#7c4dff]" />
                  Documento de Identidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* ID Type selector */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Tipo de Documento
                  </label>
                  <div className="relative mt-1">
                    <select className="h-9 w-full appearance-none rounded-xl border bg-white px-3 pr-8 text-sm outline-none focus:border-[#1351aa]/40 focus:ring-2 focus:ring-[#1351aa]/10">
                      <option>Cédula de Identidad</option>
                      <option>Pasaporte</option>
                      <option>Licencia de Conducir</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                {/* Drag-and-drop style upload */}
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1351aa]/20 bg-[#1351aa]/5 p-8 text-center transition-colors hover:border-[#1351aa]/40">
                  <Upload className="size-8 text-[#1351aa]/60" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Arrastra tu documento aquí
                    </p>
                    <p className="text-xs text-muted-foreground">
                      o haz clic para seleccionar (PDF, JPG, PNG)
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#1351aa] text-white hover:bg-[#1351aa]/90"
                  >
                    Seleccionar Archivo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Antecedentes Penales */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-4 text-[#4caf50]" />
                  Antecedentes Penales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    País de Verificación
                  </label>
                  <div className="relative mt-1">
                    <select className="h-9 w-full appearance-none rounded-xl border bg-white px-3 pr-8 text-sm outline-none focus:border-[#1351aa]/40 focus:ring-2 focus:ring-[#1351aa]/10">
                      <option>República Dominicana</option>
                      <option>México</option>
                      <option>Colombia</option>
                      <option>España</option>
                      <option>Argentina</option>
                      <option>Chile</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#1351aa]/5 p-4">
                  <Loader2 className="size-5 animate-spin text-[#1351aa]" />
                  <div>
                    <p className="text-sm font-medium">Estado</p>
                    <Badge
                      variant="secondary"
                      className={
                        bgCheck === "Verificando..."
                          ? "bg-[#1351aa]/15 text-[#1351aa]"
                          : bgCheck === "Aprobado"
                            ? "bg-[#4caf50]/15 text-[#4caf50]"
                            : "bg-red-100 text-red-600"
                      }
                    >
                      {bgCheck}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  La verificación puede tardar entre 24-72 horas hábiles.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Competencias */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-4 text-[#ff8c42]" />
                  Competencias
                </CardTitle>
                <CardDescription>
                  Haz clic en el nivel para cambiarlo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsSection />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ---- Capacitación Obligatoria ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Capacitación Obligatoria
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {trainingVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`relative ${video.completed ? "ring-2 ring-[#4caf50]/30" : ""}`}
              >
                {video.completed && (
                  <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-[#4caf50] text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                )}
                <CardHeader>
                  <CardTitle className="text-sm">
                    {video.completed ? (
                      <span className="mr-1.5">&#9745;</span>
                    ) : (
                      <span className="mr-1.5">&#9744;</span>
                    )}
                    {video.title}
                  </CardTitle>
                  <CardDescription>{video.duration}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Progreso</span>
                      <span>{video.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        className={`h-full rounded-full ${video.completed ? "bg-[#4caf50]" : "bg-[#1351aa]"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${video.progress}%` }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={
                      video.completed
                        ? "w-full bg-[#4caf50]/10 text-[#4caf50] hover:bg-[#4caf50]/20"
                        : "w-full bg-[#1351aa] text-white hover:bg-[#1351aa]/90"
                    }
                  >
                    <Play className="size-3.5" />
                    {video.completed ? "Volver a Ver" : "Ver Video"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- Reputation System ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Sistema de Reputación
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Overall rating */}
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-3 py-8">
              <span className="text-5xl font-extrabold text-gray-900">4.8</span>
              <Stars rating={4.8} size={24} />
              <p className="text-sm text-muted-foreground">
                Basado en 56 evaluaciones
              </p>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Desglose de Calificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {ratingBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-2 text-sm">
                  <span className="w-4 text-right font-medium text-muted-foreground">
                    {row.stars}
                  </span>
                  <Star
                    className="size-3.5 text-[#ffc107]"
                    fill="#ffc107"
                  />
                  <div className="flex-1">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        className="h-full rounded-full bg-[#ffc107]"
                        initial={{ width: 0 }}
                        animate={{ width: `${row.percentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <span className="w-10 text-right text-xs text-muted-foreground">
                    {row.percentage}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent reviews */}
          <Card className="lg:row-span-1">
            <CardHeader>
              <CardTitle>Reseñas Recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {volunteerReviews.map((review) => (
                <div
                  key={review.id}
                  className="space-y-1.5 border-b pb-3 last:border-none last:pb-0"
                >
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold">
                        {review.author}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {review.role}
                      </p>
                    </div>
                    <Stars rating={review.rating} size={12} />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {review.text}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {review.date}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Retroalimentacion for low-rated */}
        <Card className="border-l-4 border-l-[#ff8c42] bg-[#ff8c42]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertIcon />
              Retroalimentación para Voluntarios con Baja Calificación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              <li>
                Mejorar la preparación de material antes de cada sesión.
              </li>
              <li>
                Adaptar el ritmo de enseñanza al nivel del estudiante.
              </li>
              <li>
                Completar el curso de &quot;Guía de accesibilidad&quot; pendiente.
              </li>
              <li>
                Solicitar retroalimentación al final de cada sesión.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ---- Volunteer Directory ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Directorio de Voluntarios
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerDirectory.map((vol, i) => (
            <motion.div
              key={vol.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="text-center">
                <CardContent className="space-y-3 pt-6">
                  <Avatar size="lg" className="mx-auto size-16">
                    <AvatarImage src={vol.avatar} />
                    <AvatarFallback className="text-lg">
                      {vol.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{vol.name}</p>
                    <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {vol.country}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1">
                    <Stars rating={vol.rating} size={14} />
                    <span className="text-xs font-medium text-muted-foreground">
                      {vol.rating}
                    </span>
                  </div>

                  {/* Status badge */}
                  <Badge
                    variant="secondary"
                    className={statusStyles[vol.status] ?? ""}
                  >
                    {vol.status}
                  </Badge>

                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {vol.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="rounded-full bg-[#e3e2de]/60 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>

                  {/* Sessions count */}
                  <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Users className="size-3" />
                    {vol.sessionsCompleted} sesiones completadas
                  </p>

                  <Button
                    size="sm"
                    className="w-full bg-[#1351aa] text-white hover:bg-[#1351aa]/90"
                  >
                    Ver Perfil
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Small inline alert icon component
function AlertIcon() {
  return (
    <svg
      className="size-4 text-[#ff8c42]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M10.29 3.86l-8.16 14a1 1 0 00.87 1.5h16.34a1 1 0 00.87-1.5l-8.16-14a1 1 0 00-1.74 0z"
      />
    </svg>
  );
}
