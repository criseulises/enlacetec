"use client";

import { motion } from "motion/react";
import {
  Activity,
  Users,
  Globe,
  Star,
  Eye,
  AlertTriangle,
  Download,
  FileText,
  FileSpreadsheet,
  Clock,
  UserCircle,
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
  ctcMetrics,
  activeSessions,
  weeklyAttendance,
  hoursBySubject,
  subjectDistribution,
  studentAlerts,
  scheduleData,
  scheduleHours,
} from "@/lib/mock-data";
import type { ScheduleBlock } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-3xl font-extrabold tracking-tight"
    >
      {value}
      {suffix}
    </motion.span>
  );
}

const qualityColor: Record<string, string> = {
  green: "bg-[#4caf50]",
  yellow: "bg-[#ffc107]",
  red: "bg-red-500",
};

const blockStyles: Record<ScheduleBlock, string> = {
  disponible: "bg-[#4caf50]/20 text-[#4caf50] border-[#4caf50]/30",
  ocupado: "bg-[#1351aa]/20 text-[#1351aa] border-[#1351aa]/30",
  cerrado: "bg-gray-200 text-gray-400 border-gray-300",
};

const subjectBadgeColors: Record<string, string> = {
  Matemáticas: "bg-[#1351aa]/15 text-[#1351aa]",
  Español: "bg-[#ff8c42]/15 text-[#ff8c42]",
  Programación: "bg-[#7c4dff]/15 text-[#7c4dff]",
  Ciencias: "bg-[#4caf50]/15 text-[#4caf50]",
  Inglés: "bg-[#ff6b9d]/15 text-[#ff6b9d]",
};

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------

export default function PanelCTCPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Panel de Coordinador CTC
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitorea sesiones, estudiantes y voluntarios en tiempo real.
        </p>
      </div>

      {/* ---- Metrics Row ---- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Sesiones Activas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="border-none bg-[#4caf50]/10 shadow-none">
            <CardContent className="flex items-center gap-4 pt-2">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#4caf50]/20">
                <Activity className="size-6 text-[#4caf50]" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Sesiones Activas
                </p>
                <div className="flex items-center gap-2">
                  <AnimatedNumber value={ctcMetrics.sesionesActivas} />
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4caf50] opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-[#4caf50]" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Estudiantes Conectados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="border-none bg-[#1351aa]/10 shadow-none">
            <CardContent className="flex items-center gap-4 pt-2">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#1351aa]/20">
                <Users className="size-6 text-[#1351aa]" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Estudiantes Conectados
                </p>
                <AnimatedNumber value={ctcMetrics.estudiantesConectados} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Voluntarios Disponibles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none bg-[#7c4dff]/10 shadow-none">
            <CardContent className="flex items-center gap-4 pt-2">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#7c4dff]/20">
                <Globe className="size-6 text-[#7c4dff]" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Voluntarios Disponibles
                </p>
                <AnimatedNumber value={ctcMetrics.voluntariosDisponibles} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Satisfaccion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="border-none bg-[#ffc107]/10 shadow-none">
            <CardContent className="flex items-center gap-4 pt-2">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#ffc107]/20">
                <Star className="size-6 text-[#ffc107]" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Satisfacción
                </p>
                <AnimatedNumber
                  value={ctcMetrics.satisfaccion}
                  suffix="/5"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ---- Active Sessions Monitor ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Sesiones en Vivo
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeSessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="relative overflow-hidden">
                {/* Quality dot */}
                <span
                  className={`absolute right-4 top-4 size-3 rounded-full ${qualityColor[session.quality]}`}
                />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    {session.title}
                  </CardTitle>
                  <span
                    className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${subjectBadgeColors[session.subject] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {session.subject}
                  </span>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* People */}
                  <div className="flex items-center gap-3 text-sm">
                    <Avatar size="sm">
                      <AvatarImage src={session.student.avatar} />
                      <AvatarFallback>
                        {session.student.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground">
                      {session.student.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Avatar size="sm">
                      <AvatarImage src={session.volunteer.avatar} />
                      <AvatarFallback>
                        {session.volunteer.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground">
                      {session.volunteer.name}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    <span className="font-mono">{session.duration}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="bg-[#1351aa] text-white hover:bg-[#1351aa]/90">
                      <Eye className="size-3.5" />
                      Supervisar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#ff8c42]/40 text-[#ff8c42] hover:bg-[#ff8c42]/10"
                    >
                      <AlertTriangle className="size-3.5" />
                      Intervenir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- Weekly Charts ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Reporte Semanal
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Line - Asistencia Semanal */}
          <Card>
            <CardHeader>
              <CardTitle>Asistencia Semanal</CardTitle>
              <CardDescription>Estudiantes por día</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 256 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyAttendance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e3e2de" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="asistencia"
                    stroke="#1351aa"
                    strokeWidth={2.5}
                    dot={{ fill: "#1351aa", r: 4 }}
                    activeDot={{ r: 6, fill: "#ff8c42" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar - Horas por Materia */}
          <Card>
            <CardHeader>
              <CardTitle>Horas por Materia</CardTitle>
              <CardDescription>Total de horas esta semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 256 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hoursBySubject}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e3e2de" />
                  <XAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                    {hoursBySubject.map((entry) => (
                      <Cell key={entry.subject} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie - Distribución de Materias */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Materias</CardTitle>
              <CardDescription>Porcentaje de sesiones</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 256 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={(props) =>
                      `${props.name} ${((props.percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {subjectDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---- Student Alerts ---- */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <AlertTriangle className="size-5 text-[#ff8c42]" />
          Alertas de Estudiantes
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {studentAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card
                className={`border-l-4 ${alert.severity === "high" ? "border-l-red-500 bg-red-50/60" : "border-l-[#ff8c42] bg-[#ff8c42]/5"}`}
              >
                <CardContent className="flex items-start justify-between gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-800">
                      {alert.message}
                    </p>
                    <Badge
                      variant="secondary"
                      className={
                        alert.severity === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-[#ff8c42]/15 text-[#ff8c42]"
                      }
                    >
                      {alert.severity === "high" ? "Alta prioridad" : "Media"}
                    </Badge>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" variant="outline">
                      <UserCircle className="size-3.5" />
                      Ver Perfil
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#1351aa] text-white hover:bg-[#1351aa]/90"
                    >
                      Contactar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- Schedule Management ---- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Disponibilidad Semanal del CTC
        </h2>
        <Card>
          <CardContent className="overflow-x-auto pt-2">
            <table className="w-full min-w-[600px] text-xs">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground">
                    Hora
                  </th>
                  {Object.keys(scheduleData).map((day) => (
                    <th
                      key={day}
                      className="px-2 py-2 text-center font-medium text-muted-foreground"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleHours.map((hour, hi) => (
                  <tr key={hour}>
                    <td className="whitespace-nowrap px-2 py-1 font-mono text-muted-foreground">
                      {hour}
                    </td>
                    {Object.keys(scheduleData).map((day) => {
                      const block = scheduleData[day][hi];
                      return (
                        <td key={day + hour} className="px-1 py-1">
                          <span
                            className={`flex items-center justify-center rounded-lg border px-2 py-1 text-[10px] font-semibold capitalize ${blockStyles[block]}`}
                          >
                            {block === "disponible"
                              ? "Disponible"
                              : block === "ocupado"
                                ? "Ocupado"
                                : "Cerrado"}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* ---- Export Buttons ---- */}
      <section className="flex flex-wrap gap-3">
        <Button className="bg-[#1351aa] text-white hover:bg-[#1351aa]/90">
          <FileText className="size-4" />
          Exportar Reporte PDF
          <Download className="size-3.5" />
        </Button>
        <Button variant="outline">
          <FileSpreadsheet className="size-4" />
          Exportar CSV
          <Download className="size-3.5" />
        </Button>
      </section>
    </div>
  );
}
