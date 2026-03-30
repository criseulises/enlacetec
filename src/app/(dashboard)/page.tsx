"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import {
  CalendarDays,
  Users,
  TrendingUp,
  Clock,
  HelpCircle,
  BookOpen,
  Bot,
  Trophy,
  BookMarked,
  BarChart3,
  ArrowUpRight,
  Star,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  currentStudent,
  stats,
  proximasSesiones,
  solicitudesPendientes,
  progresoSemanal,
  actividadReciente,
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

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos d\u00edas";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

const motivationalMessages = [
  "Cada d\u00eda aprendes algo nuevo. \u00a1Sigue as\u00ed!",
  "Los grandes logros comienzan con peque\u00f1os pasos.",
  "Tu curiosidad es tu superpoder.",
  "Hoy es un gran d\u00eda para aprender.",
];

function getMotivationalMessage(): string {
  const index = Math.floor(
    (new Date().getDate() + new Date().getMonth()) %
      motivationalMessages.length
  );
  return motivationalMessages[index];
}

const statCards = [
  {
    label: "Sesiones Hoy",
    value: stats.sesionesHoy,
    trend: stats.sesionesHoyTrend,
    icon: CalendarDays,
    bg: "bg-blue-50",
    iconBg: "bg-[#1351aa]/10",
    iconColor: "text-[#1351aa]",
    border: "border-[#1351aa]/20",
  },
  {
    label: "Voluntarios Activos",
    value: stats.voluntariosActivos,
    trend: stats.voluntariosActivosTrend,
    icon: Users,
    bg: "bg-green-50",
    iconBg: "bg-[#4caf50]/10",
    iconColor: "text-[#4caf50]",
    border: "border-[#4caf50]/20",
  },
  {
    label: "Tu Progreso",
    value: `${stats.tuProgreso}%`,
    trend: stats.tuProgresoTrend,
    icon: TrendingUp,
    bg: "bg-purple-50",
    iconBg: "bg-[#7c4dff]/10",
    iconColor: "text-[#7c4dff]",
    border: "border-[#7c4dff]/20",
  },
  {
    label: "Horas Aprendidas",
    value: stats.horasAprendidas,
    trend: stats.horasAprendidasTrend,
    icon: Clock,
    bg: "bg-orange-50",
    iconBg: "bg-[#ff8c42]/10",
    iconColor: "text-[#ff8c42]",
    border: "border-[#ff8c42]/20",
  },
];

const activityIcons: Record<string, React.ElementType> = {
  book: BookMarked,
  trophy: Trophy,
  help: HelpCircle,
  chart: BarChart3,
};

export default function DashboardPage() {
  const greeting = useMemo(getGreeting, []);
  const motivational = useMemo(getMotivationalMessage, []);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Welcome banner */}
      <motion.div variants={fadeInUp}>
        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#1351aa] to-[#1351aa]/80 text-white shadow-lg">
          <CardContent className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/80">{greeting}</p>
              <h1
                className="text-2xl font-bold sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hola, {currentStudent.name}! &#128075;
              </h1>
              <p className="max-w-md text-sm text-white/80">{motivational}</p>
            </div>
            <div
              className="hidden select-none text-7xl opacity-80 sm:block"
              aria-hidden="true"
            >
              &#128218;&#128640;&#11088;
            </div>
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-6 right-16 size-20 rounded-full bg-white/5" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={stagger}
      >
        {statCards.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <Card
              className={`${stat.bg} border ${stat.border} transition-shadow hover:shadow-md`}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg}`}
                >
                  <stat.icon className={`size-6 ${stat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-[#4caf50]">
                    <ArrowUpRight className="size-3" />
                    {stat.trend}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Próximas Sesiones */}
      <motion.div variants={fadeInUp}>
        <div className="mb-3 flex items-center justify-between">
          <h2
            className="text-lg font-bold text-gray-800"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pr&oacute;ximas Sesiones
          </h2>
          <Button variant="ghost" size="sm" className="text-[#1351aa]">
            Ver todas
          </Button>
        </div>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {proximasSesiones.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="w-[220px] shrink-0 border transition-shadow hover:shadow-md">
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        className="rounded-lg text-[10px] text-white"
                        style={{ backgroundColor: session.color }}
                      >
                        {session.subject}
                      </Badge>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {session.date}
                      </span>
                    </div>
                    <p
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {session.time}
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarImage src={session.volunteerAvatar} />
                        <AvatarFallback>
                          {session.volunteerName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate text-xs font-medium">
                        {session.volunteerName}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </motion.div>

      {/* Two columns: Solicitudes + Progreso Semanal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Solicitudes de Ayuda Pendientes */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-base"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <HelpCircle className="size-5 text-[#ff8c42]" />
                Solicitudes de Ayuda Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {solicitudesPendientes.map((req) => (
                <motion.div
                  key={req.id}
                  className="flex items-start gap-3 rounded-xl border bg-white p-3 transition-colors hover:bg-[#e3e2de]/20"
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="mt-0.5 size-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: getSubjectColor(req.subject),
                    }}
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
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
                    </div>
                    <p className="text-sm">{req.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        {req.createdAt}
                      </span>
                      <Badge
                        variant="outline"
                        className="rounded-lg text-[10px]"
                      >
                        {req.status}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Progreso Semanal */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-base"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <BarChart3 className="size-5 text-[#7c4dff]" />
                Tu Progreso Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progresoSemanal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e3e2de" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#888" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#888" }}
                    axisLine={false}
                    tickLine={false}
                    unit="h"
                  />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [`${value}h`, "Horas"]}
                  />
                  <Bar
                    dataKey="hours"
                    fill="#7c4dff"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Actividad Reciente */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle
              className="flex items-center gap-2 text-base"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <Activity className="size-5 text-[#ff6b9d]" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute bottom-0 left-4 top-0 w-px bg-[#e3e2de]" />

              {actividadReciente.map((activity, index) => {
                const IconComp = activityIcons[activity.icon] || Activity;
                const colors: Record<string, string> = {
                  session: "#1351aa",
                  achievement: "#ffc107",
                  help: "#ff8c42",
                  progress: "#4caf50",
                };
                const color = colors[activity.type] || "#1351aa";

                return (
                  <motion.div
                    key={activity.id}
                    className="relative flex items-start gap-4 pl-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <IconComp className="size-4" style={{ color }} />
                    </div>
                    <div className="min-w-0 flex-1 pb-2">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick action floating buttons */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex size-12 items-center justify-center rounded-full bg-[#7c4dff] text-white shadow-lg shadow-[#7c4dff]/30 transition-shadow hover:shadow-xl"
                >
                  <Bot className="size-5" />
                </motion.button>
              }
            />
            <TooltipContent side="left">Hablar con IA</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex size-12 items-center justify-center rounded-full bg-[#4caf50] text-white shadow-lg shadow-[#4caf50]/30 transition-shadow hover:shadow-xl"
                >
                  <BookOpen className="size-5" />
                </motion.button>
              }
            />
            <TooltipContent side="left">Ver Clases</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex size-14 items-center justify-center rounded-full bg-[#ff8c42] text-white shadow-lg shadow-[#ff8c42]/30 transition-shadow hover:shadow-xl"
                >
                  <HelpCircle className="size-6" />
                </motion.button>
              }
            />
            <TooltipContent side="left">Pedir Ayuda</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </motion.div>
  );
}
