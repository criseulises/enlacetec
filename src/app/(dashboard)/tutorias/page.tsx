"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Radio,
  HelpCircle,
  PenTool,
  History,
  Play,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  Send,
  Paperclip,
  Star,
  AlertCircle,
  Pencil,
  Eraser,
  Type,
  Square,
  Circle,
  Palette,
  Clock,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  sesionesEnVivo,
  solicitudesPendientes,
  chatMessages,
  historialSesiones,
  subjects,
  getSubjectColor,
} from "@/lib/mock-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* ──────────────────────────────────────────
   Tab 1: En Vivo
   ────────────────────────────────────────── */

function EnVivoTab() {
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Mock video call area */}
      <motion.div variants={fadeInUp}>
        <Card className="overflow-hidden border-2 border-dashed border-gray-200 bg-gray-900">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-8 sm:p-12">
            <div className="flex size-20 items-center justify-center rounded-full bg-white/10">
              <Play className="size-10 text-white" />
            </div>
            <p className="text-center text-sm text-white/70">
              Selecciona una sesi&oacute;n para unirte a la videollamada
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Video className="mr-1.5 size-4" />
                C&aacute;mara
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Mic className="mr-1.5 size-4" />
                Micr&oacute;fono
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Monitor className="mr-1.5 size-4" />
                Pantalla
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active sessions grid */}
      <div>
        <h3
          className="mb-3 text-base font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Sesiones Activas
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {sesionesEnVivo.map((session, index) => (
            <motion.div
              key={session.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative overflow-hidden border-2 transition-shadow hover:shadow-lg">
                {/* Colored top strip */}
                <div
                  className="h-1"
                  style={{
                    backgroundColor: getSubjectColor(session.subject),
                  }}
                />
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      className="rounded-lg text-[10px] text-white"
                      style={{
                        backgroundColor: getSubjectColor(session.subject),
                      }}
                    >
                      {session.subject}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                      </span>
                      <span className="text-[10px] font-semibold text-red-500">
                        En Vivo
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-muted-foreground">
                    {session.topic}
                  </p>

                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarImage src={session.volunteerAvatar} />
                      <AvatarFallback>
                        {session.volunteerName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold">
                        {session.volunteerName}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        con {session.studentName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {session.duration}
                    </div>
                    <Button
                      size="sm"
                      className="rounded-xl bg-[#4caf50] text-xs text-white hover:bg-[#4caf50]/90"
                    >
                      Unirse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Tab 2: Solicitar Ayuda
   ────────────────────────────────────────── */

function SolicitarAyudaTab() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<"Normal" | "Urgente">("Normal");

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Form */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle
              className="flex items-center gap-2 text-base"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <HelpCircle className="size-5 text-[#ff8c42]" />
              Nueva Solicitud de Ayuda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Materia</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <motion.button
                    key={subject.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSubject(subject.value)}
                    className={`rounded-xl border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                      selectedSubject === subject.value
                        ? "border-transparent text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                    style={
                      selectedSubject === subject.value
                        ? { backgroundColor: subject.color }
                        : undefined
                    }
                  >
                    {subject.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Describe tu problema
              </label>
              <Textarea
                placeholder="Cuéntanos en qué necesitas ayuda..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 rounded-xl"
              />
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Urgencia</label>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUrgency("Normal")}
                  className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                    urgency === "Normal"
                      ? "border-[#4caf50] bg-[#4caf50]/10 text-[#4caf50]"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <Clock className="size-4" />
                  Normal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUrgency("Urgente")}
                  className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                    urgency === "Urgente"
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  <AlertCircle className="size-4" />
                  Urgente
                </motion.button>
              </div>
            </div>

            {/* Attach file + Submit */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="outline"
                className="rounded-xl"
              >
                <Paperclip className="mr-1.5 size-4" />
                Adjuntar archivo
              </Button>
              <Button className="rounded-xl bg-[#1351aa] text-white hover:bg-[#1351aa]/90">
                <Send className="mr-1.5 size-4" />
                Enviar solicitud
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pending requests */}
      <motion.div variants={fadeInUp}>
        <h3
          className="mb-3 text-base font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tus Solicitudes Pendientes
        </h3>
        <div className="space-y-3">
          {solicitudesPendientes.map((req) => (
            <motion.div
              key={req.id}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-4">
                  <div
                    className="mt-1 size-3 shrink-0 rounded-full"
                    style={{
                      backgroundColor: getSubjectColor(req.subject),
                    }}
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className="rounded-lg text-[10px] text-white"
                        style={{
                          backgroundColor: getSubjectColor(req.subject),
                        }}
                      >
                        {req.subject}
                      </Badge>
                      {req.urgency === "Urgente" && (
                        <Badge className="rounded-lg bg-red-100 text-[10px] text-red-700">
                          Urgente
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className="ml-auto rounded-lg text-[10px]"
                      >
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{req.description}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {req.createdAt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Tab 3: Pizarra Digital
   ────────────────────────────────────────── */

function PizarraDigitalTab() {
  const [activeTool, setActiveTool] = useState("pencil");

  const tools = [
    { id: "pencil", icon: Pencil, label: "L\u00e1piz" },
    { id: "eraser", icon: Eraser, label: "Borrador" },
    { id: "text", icon: Type, label: "Texto" },
    { id: "square", icon: Square, label: "Rect\u00e1ngulo" },
    { id: "circle", icon: Circle, label: "C\u00edrculo" },
    { id: "palette", icon: Palette, label: "Colores" },
  ];

  const colors = ["#1351aa", "#ff8c42", "#4caf50", "#7c4dff", "#ff6b9d", "#ffc107", "#333333"];

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-4 lg:flex-row"
      >
        {/* Whiteboard area */}
        <div className="flex-1 space-y-3">
          {/* Toolbar */}
          <Card className="p-2">
            <div className="flex flex-wrap items-center gap-2">
              {tools.map((tool) => (
                <motion.button
                  key={tool.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTool(tool.id)}
                  className={`flex size-9 items-center justify-center rounded-xl transition-all ${
                    activeTool === tool.id
                      ? "bg-[#1351aa] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  title={tool.label}
                >
                  <tool.icon className="size-4" />
                </motion.button>
              ))}

              <div className="mx-2 h-6 w-px bg-gray-200" />

              {/* Color swatches */}
              {colors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="size-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}

              <div className="ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <Monitor className="mr-1.5 size-4" />
                  Compartir Pantalla
                </Button>
              </div>
            </div>
          </Card>

          {/* Canvas mock */}
          <Card className="overflow-hidden">
            <div className="relative flex min-h-[400px] items-center justify-center bg-white p-8">
              {/* Mock math equations drawn on whiteboard */}
              <svg
                viewBox="0 0 600 300"
                className="h-full w-full max-w-lg"
                aria-label="Pizarra digital con ecuaciones matem&aacute;ticas"
              >
                {/* Grid dots */}
                {Array.from({ length: 15 }).map((_, row) =>
                  Array.from({ length: 20 }).map((_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={col * 32 + 16}
                      cy={row * 22 + 11}
                      r="1"
                      fill="#e3e2de"
                    />
                  ))
                )}

                {/* Mock handwritten math */}
                <text
                  x="40"
                  y="60"
                  fontSize="24"
                  fontFamily="cursive"
                  fill="#1351aa"
                >
                  Fracciones Equivalentes
                </text>
                <text
                  x="60"
                  y="120"
                  fontSize="32"
                  fontFamily="cursive"
                  fill="#333"
                >
                  1/2 = 2/4 = 3/6
                </text>
                <text
                  x="60"
                  y="180"
                  fontSize="32"
                  fontFamily="cursive"
                  fill="#7c4dff"
                >
                  2/3 = 4/6 = 6/9
                </text>

                {/* Arrow */}
                <line
                  x1="280"
                  y1="100"
                  x2="280"
                  y2="170"
                  stroke="#ff8c42"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#ff8c42" />
                  </marker>
                </defs>

                {/* Multiplying indicator */}
                <text
                  x="290"
                  y="140"
                  fontSize="14"
                  fill="#ff8c42"
                  fontFamily="cursive"
                >
                  x2
                </text>

                {/* Check mark */}
                <text x="400" y="120" fontSize="28" fill="#4caf50">
                  &#10003;
                </text>

                {/* Star */}
                <text x="400" y="180" fontSize="20">&#11088;</text>
              </svg>
            </div>
          </Card>
        </div>

        {/* Chat sidebar */}
        <Card className="w-full shrink-0 lg:w-72">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-sm">Chat de la Sesi&oacute;n</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[360px]">
            <div className="space-y-3 p-3">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.sender === "student" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar size="sm">
                    <AvatarFallback
                      className={
                        msg.sender === "volunteer"
                          ? "bg-[#1351aa]/10 text-[#1351aa]"
                          : "bg-[#ff6b9d]/10 text-[#ff6b9d]"
                      }
                    >
                      {msg.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] space-y-0.5 ${
                      msg.sender === "student" ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-3 py-1.5 text-xs ${
                        msg.sender === "student"
                          ? "bg-[#1351aa] text-white"
                          : "bg-[#e3e2de]/50"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <p className="text-[9px] text-muted-foreground">
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 rounded-xl border bg-[#e3e2de]/20 px-3 py-1.5 text-xs outline-none focus:border-[#1351aa]/30"
              />
              <Button size="icon" className="size-8 shrink-0 rounded-xl bg-[#1351aa]">
                <Send className="size-3.5" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Tab 4: Historial
   ────────────────────────────────────────── */

function HistorialTab() {
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {historialSesiones.map((session) => (
        <motion.div
          key={session.id}
          variants={fadeInUp}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Left: avatar + info */}
                <div className="flex flex-1 items-start gap-3">
                  <Avatar>
                    <AvatarImage src={session.volunteerAvatar} />
                    <AvatarFallback>
                      {session.volunteerName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className="rounded-lg text-[10px] text-white"
                        style={{
                          backgroundColor: getSubjectColor(session.subject),
                        }}
                      >
                        {session.subject}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {session.date}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{session.topic}</p>
                    <p className="text-xs text-muted-foreground">
                      con {session.volunteerName} &middot; {session.duration}
                    </p>
                  </div>
                </div>

                {/* Right: rating + action */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < session.rating
                            ? "fill-[#ffc107] text-[#ffc107]"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs"
                  >
                    <Eye className="mr-1 size-3.5" />
                    Ver Grabaci&oacute;n
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Main Page
   ────────────────────────────────────────── */

export default function TutoriasPage() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div>
        <h1
          className="text-2xl font-bold text-gray-800"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tutor&iacute;as
        </h1>
        <p className="text-sm text-muted-foreground">
          Aprende, pregunta y colabora con voluntarios de todo el mundo.
        </p>
      </div>

      <Tabs defaultValue="en-vivo">
        <TabsList className="mb-4 h-10 w-full rounded-xl bg-[#e3e2de]/50 p-1 sm:w-auto">
          <TabsTrigger
            value="en-vivo"
            className="gap-1.5 rounded-lg data-active:bg-white data-active:shadow-sm"
          >
            <Radio className="size-3.5" />
            En Vivo
          </TabsTrigger>
          <TabsTrigger
            value="solicitar"
            className="gap-1.5 rounded-lg data-active:bg-white data-active:shadow-sm"
          >
            <HelpCircle className="size-3.5" />
            Solicitar Ayuda
          </TabsTrigger>
          <TabsTrigger
            value="pizarra"
            className="gap-1.5 rounded-lg data-active:bg-white data-active:shadow-sm"
          >
            <PenTool className="size-3.5" />
            Pizarra Digital
          </TabsTrigger>
          <TabsTrigger
            value="historial"
            className="gap-1.5 rounded-lg data-active:bg-white data-active:shadow-sm"
          >
            <History className="size-3.5" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="en-vivo">
          <EnVivoTab />
        </TabsContent>
        <TabsContent value="solicitar">
          <SolicitarAyudaTab />
        </TabsContent>
        <TabsContent value="pizarra">
          <PizarraDigitalTab />
        </TabsContent>
        <TabsContent value="historial">
          <HistorialTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
