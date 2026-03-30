"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  BookOpen,
  Clock,
  Tag,
  AlertTriangle,
  History,
  GraduationCap,
  CheckCircle2,
  XCircle,
  ChevronRight,
  MessageSquare,
  Volume2,
  Type,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  studentProfile,
  aiChatMessages,
  exerciseData,
  type AiChatMessage,
} from "@/lib/mock-data";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const subjectColorMap: Record<string, string> = {
  Matemáticas: "bg-[#1351aa]",
  Ciencias: "bg-[#4caf50]",
  Lectoescritura: "bg-[#ff8c42]",
  Programación: "bg-[#7c4dff]",
};

const subjectBadgeMap: Record<string, string> = {
  Matemáticas: "bg-[#dbe6f6] text-[#1351aa]",
  Ciencias: "bg-[#e8f5e9] text-[#4caf50]",
  Lectoescritura: "bg-[#fff3e0] text-[#ff8c42]",
  Programación: "bg-[#ede7f6] text-[#7c4dff]",
};

export default function ProfesorIAPage() {
  const [messages] = useState<AiChatMessage[]>(aiChatMessages);
  const [inputValue, setInputValue] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [modeToggle, setModeToggle] = useState<"text" | "voice">("text");

  const handleAnswerSelect = (id: string) => {
    setSelectedAnswer(id);
    setShowFeedback(true);
  };

  const isCorrect = selectedAnswer === exerciseData.correctAnswer;

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-4 p-4">
      {/* Left Sidebar - Student Profile */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-1/3 min-w-[320px] max-w-[400px] flex flex-col gap-4 overflow-y-auto"
      >
        {/* Profile Card */}
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="size-14">
                <AvatarFallback className="bg-gradient-to-br from-[#7c4dff] to-[#ff6b9d] text-white text-lg font-bold">
                  {studentProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">
                  {studentProfile.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <GraduationCap className="size-3.5" />
                  {studentProfile.grade}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Academic Level */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="size-4 text-[#1351aa]" />
                Nivel Académico
              </h3>
              <div className="space-y-3">
                {studentProfile.subjects.map((subject) => (
                  <div key={subject.name}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{subject.name}</span>
                      <span className="text-xs font-semibold">{subject.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${subject.level}%`, backgroundColor: subject.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Interests */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Tag className="size-4 text-[#4caf50]" />
                Materias de Interés
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {studentProfile.interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="rounded-full text-xs px-2.5 py-0.5"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reinforcement Areas */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="size-4 text-[#ff8c42]" />
                Áreas de Refuerzo
              </h3>
              <div className="space-y-1.5">
                {studentProfile.reinforcement.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 rounded-lg bg-[#ff8c42]/10 border border-[#ff8c42]/20 px-3 py-1.5 text-xs font-medium text-[#ff8c42]"
                  >
                    <ChevronRight className="size-3" />
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Query History */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <History className="size-4 text-[#7c4dff]" />
                Historial de Consultas
              </h3>
              <div className="space-y-2">
                {studentProfile.queryHistory.map((query) => (
                  <motion.div
                    key={query.id}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2 cursor-pointer hover:bg-muted transition-colors"
                  >
                    <MessageSquare className="size-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">
                        {query.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">
                          {query.date}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                            subjectBadgeMap[query.subject]
                          )}
                        >
                          {query.subject}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.aside>

      {/* Main Chat Area */}
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="flex-1 flex flex-col gap-3 min-w-0"
      >
        {/* Chat Header */}
        <Card className="border-none shadow-md">
          <CardContent className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-11 rounded-full bg-gradient-to-br from-[#7c4dff] to-[#b388ff] flex items-center justify-center shadow-md">
                  <Bot className="size-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 size-3 bg-[#4caf50] rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-base">
                  Profe EnlaceTEC
                </h2>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#4caf50] inline-block" />
                  En línea 24/7
                </p>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              <button
                onClick={() => setModeToggle("text")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  modeToggle === "text"
                    ? "bg-white text-[#1351aa] shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Type className="size-3.5" />
                Texto
              </button>
              <button
                onClick={() => setModeToggle("voice")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  modeToggle === "voice"
                    ? "bg-white text-[#7c4dff] shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Volume2 className="size-3.5" />
                Voz
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="flex-1 border-none shadow-md overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.role === "student" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    {/* Avatar */}
                    {msg.role === "ai" ? (
                      <div className="size-8 rounded-full bg-gradient-to-br from-[#7c4dff] to-[#b388ff] flex items-center justify-center shrink-0 shadow-sm">
                        <Bot className="size-4 text-white" />
                      </div>
                    ) : (
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-[#1351aa] text-white text-xs font-semibold">
                          MJ
                        </AvatarFallback>
                      </Avatar>
                    )}

                    {/* Bubble */}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                        msg.role === "ai"
                          ? "bg-white border-2 border-[#7c4dff]/20 shadow-sm"
                          : "bg-[#1351aa] text-white"
                      )}
                    >
                      <p>{msg.content}</p>
                      <p
                        className={cn(
                          "text-[10px] mt-1",
                          msg.role === "ai"
                            ? "text-muted-foreground"
                            : "text-white/70"
                        )}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </Card>

        {/* Input Area */}
        <Card className="border-none shadow-md">
          <CardContent className="py-3 space-y-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-[#ff8c42]"
              >
                <Paperclip className="size-4" />
              </Button>
              <Input
                placeholder="Escribe tu pregunta aquí..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 rounded-full bg-muted/50 border-none h-10 px-4 text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-[#7c4dff]"
              >
                <Mic className="size-4" />
              </Button>
              <Button
                size="icon"
                className="shrink-0 rounded-full bg-[#1351aa] hover:bg-[#1351aa]/90 size-10"
              >
                <Send className="size-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs gap-1.5 border-[#7c4dff]/30 text-[#7c4dff] hover:bg-[#7c4dff]/10"
                >
                  <Sparkles className="size-3" />
                  Generar Ejercicio
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs gap-1.5 border-[#ff8c42]/30 text-[#ff8c42] hover:bg-[#ff8c42]/10"
                >
                  <RefreshCw className="size-3" />
                  Explicar de Nuevo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs gap-1.5 border-[#4caf50]/30 text-[#4caf50] hover:bg-[#4caf50]/10"
                >
                  <ImageIcon className="size-3" />
                  Ver Ejemplo Visual
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Card className="border-2 border-[#7c4dff]/20 shadow-lg bg-gradient-to-br from-white to-[#ede7f6]/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="size-7 rounded-lg bg-[#7c4dff] flex items-center justify-center">
                    <Sparkles className="size-4 text-white" />
                  </div>
                  Ejercicio: {exerciseData.title}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="rounded-full text-xs bg-[#7c4dff]/10 text-[#7c4dff]"
                >
                  Ejercicio {exerciseData.currentExercise} de{" "}
                  {exerciseData.totalExercises}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base font-semibold text-center py-2">
                {exerciseData.question}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {exerciseData.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={cn(
                      "rounded-xl py-3 px-4 text-sm font-semibold border-2 transition-all",
                      selectedAnswer === option.id
                        ? option.id === exerciseData.correctAnswer
                          ? "bg-[#4caf50]/10 border-[#4caf50] text-[#4caf50]"
                          : "bg-red-50 border-red-400 text-red-500"
                        : "bg-white border-muted hover:border-[#7c4dff]/40 hover:bg-[#7c4dff]/5 text-foreground"
                    )}
                  >
                    <span className="text-xs text-muted-foreground mr-2 uppercase">
                      {option.id})
                    </span>
                    {option.label}
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn(
                      "rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-medium",
                      isCorrect
                        ? "bg-[#4caf50]/10 text-[#4caf50]"
                        : "bg-red-50 text-red-500"
                    )}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="size-5" />
                        <span>
                          ¡Correcto! 🎉 2/5 + 1/5 = 3/5. ¡Excelente trabajo!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="size-5" />
                        <span>
                          Intenta de nuevo. Recuerda: cuando los denominadores
                          son iguales, solo sumas los numeradores.
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7c4dff] to-[#b388ff] rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(exerciseData.currentExercise / exerciseData.totalExercises) * 100}%`,
                    }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {exerciseData.currentExercise}/{exerciseData.totalExercises}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RAG Badge */}
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="rounded-full text-[10px] px-3 py-1 text-muted-foreground border-dashed"
          >
            <Bot className="size-3 mr-1" />
            Powered by RAG - Currículo Dominicano
          </Badge>
        </div>
      </motion.main>
    </div>
  );
}
