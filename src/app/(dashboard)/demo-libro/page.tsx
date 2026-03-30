"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Hand,
  Eye,
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Accessibility,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

/* ================================================================== */
/*  Data: Word timestamps from UNICEF Whisper transcriptions           */
/* ================================================================== */

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

const pages = [
  {
    id: 1,
    audio: "/demo/audios/pages/PollitoPito_Pagina2.wav",
    descriptiveAudio: "/demo/audios/descriptive/2-3_descriptivo.wav",
    image: "/demo/images/characters/pollito_pito_completo.png",
    imageAlt: "Pollito Pito caminando por el bosque cuando le cae una ciruela en la cabeza",
    words: [
      { word: "Un", start: 0.0, end: 1.2 },
      { word: "dia,", start: 1.2, end: 1.5 },
      { word: "Pollito", start: 1.94, end: 2.38 },
      { word: "Pito", start: 2.38, end: 2.8 },
      { word: "fue", start: 2.8, end: 3.06 },
      { word: "al", start: 3.06, end: 3.26 },
      { word: "bosque", start: 3.26, end: 3.7 },
      { word: "y", start: 3.7, end: 4.58 },
      { word: "le", start: 5.52, end: 6.2 },
      { word: "cayo", start: 6.2, end: 6.62 },
      { word: "una", start: 6.62, end: 6.88 },
      { word: "ciruela", start: 6.88, end: 7.32 },
      { word: "en", start: 7.32, end: 7.68 },
      { word: "la", start: 7.68, end: 7.84 },
      { word: "cabeza.", start: 7.84, end: 8.34 },
    ] as WordTimestamp[],
    signLanguageVideo: "/demo/videos/pages/Pag_2-3.webm",
    bgColor: "from-green-100 to-emerald-50",
  },
  {
    id: 2,
    audio: "/demo/audios/pages/PollitoPito_Pagina3.wav",
    descriptiveAudio: "/demo/audios/descriptive/2-3_descriptivo.wav",
    signLanguageVideo: "/demo/videos/pages/Pag_2-3.webm",
    image: "/demo/images/characters/gallina_fina.png",
    imageAlt: "Pollito Pito asustado hablando con Gallina Fina sobre que el cielo se va a caer",
    words: [
      { word: "Dijo", start: 0.0, end: 1.22 },
      { word: "muy", start: 1.22, end: 1.6 },
      { word: "asustado:", start: 1.6, end: 2.28 },
      { word: "El", start: 3.04, end: 3.28 },
      { word: "cielo", start: 3.28, end: 3.66 },
      { word: "se", start: 3.66, end: 3.94 },
      { word: "va", start: 3.94, end: 4.12 },
      { word: "a", start: 4.12, end: 4.3 },
      { word: "caer", start: 4.3, end: 4.78 },
      { word: "y", start: 4.78, end: 5.2 },
      { word: "el", start: 5.2, end: 5.56 },
      { word: "rey", start: 5.56, end: 5.84 },
      { word: "lo", start: 5.84, end: 6.02 },
      { word: "debe", start: 6.02, end: 6.22 },
      { word: "saber.", start: 6.22, end: 6.82 },
      { word: "Voy", start: 7.46, end: 7.78 },
      { word: "de", start: 7.78, end: 7.94 },
      { word: "prisa", start: 7.94, end: 8.36 },
      { word: "a", start: 8.36, end: 8.56 },
      { word: "avisarle.", start: 8.56, end: 9.2 },
    ] as WordTimestamp[],
    bgColor: "from-amber-100 to-yellow-50",
  },
  {
    id: 3,
    audio: "/demo/audios/pages/PollitoPito_Pagina4.wav",
    descriptiveAudio: "/demo/audios/descriptive/4-5_descriptivo.wav",
    signLanguageVideo: "/demo/videos/pages/Pag_4-5.webm",
    image: "/demo/images/characters/pato_zapato_completo.png",
    imageAlt: "Pollito Pito encontrandose con Pato Zapato en el camino al castillo del rey",
    words: [
      { word: "En", start: 0.0, end: 0.5 },
      { word: "el", start: 0.5, end: 0.7 },
      { word: "camino", start: 0.7, end: 1.2 },
      { word: "se", start: 1.2, end: 1.5 },
      { word: "encontro", start: 1.5, end: 2.0 },
      { word: "con", start: 2.0, end: 2.3 },
      { word: "Pato", start: 2.3, end: 2.7 },
      { word: "Zapato.", start: 2.7, end: 3.3 },
      { word: "Adonde", start: 3.8, end: 4.3 },
      { word: "vas,", start: 4.3, end: 4.7 },
      { word: "Pollito", start: 4.7, end: 5.1 },
      { word: "Pito?", start: 5.1, end: 5.6 },
    ] as WordTimestamp[],
    bgColor: "from-blue-100 to-sky-50",
  },
];

const glossaryItems = [
  { word: "Ciruela", image: "/demo/images/glossary/ciruela.png", audio: "/demo/audios/glossary/ciruela-definicion.wav", video: "/demo/videos/glossary/ciruela.webm", definition: "Fruta pequena, redonda y dulce, de color morado o rojo." },
  { word: "Cueva", image: "/demo/images/glossary/cueva.png", audio: "/demo/audios/glossary/cueva.wav", video: "/demo/videos/glossary/cueva.webm", definition: "Cavidad natural en la tierra o en las rocas." },
  { word: "Atajo", image: "/demo/images/glossary/atajo.jpg", audio: "/demo/audios/glossary/atajo.wav", video: "/demo/videos/glossary/atajo.webm", definition: "Camino mas corto para llegar a un lugar." },
  { word: "Bobo", image: "/demo/images/glossary/bobo.png", audio: "/demo/audios/glossary/bobo.wav", video: "/demo/videos/glossary/bobo.webm", definition: "Persona que actua de manera ingenua o tonta." },
];

/* ================================================================== */
/*  Book Reader with highlighted reading                               */
/* ================================================================== */

function BookReader() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeWordIdx, setActiveWordIdx] = useState(-1);
  const [showSignLanguage, setShowSignLanguage] = useState(false);
  const [showDescriptiveAudio, setShowDescriptiveAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const descAudioRef = useRef<HTMLAudioElement>(null);
  const animFrameRef = useRef<number>(0);

  const page = pages[currentPage];

  const updateHighlight = useCallback(() => {
    if (!audioRef.current || audioRef.current.paused) return;
    const t = audioRef.current.currentTime;
    setCurrentTime(t);
    const idx = page.words.findIndex((w) => t >= w.start && t <= w.end);
    setActiveWordIdx(idx);
    animFrameRef.current = requestAnimationFrame(updateHighlight);
  }, [page.words]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animFrameRef.current);
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
      animFrameRef.current = requestAnimationFrame(updateHighlight);
    }
  }, [isPlaying, updateHighlight]);

  const playDescriptive = useCallback(async () => {
    if (!descAudioRef.current) return;
    if (showDescriptiveAudio) {
      descAudioRef.current.pause();
      descAudioRef.current.currentTime = 0;
      setShowDescriptiveAudio(false);
    } else {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setShowDescriptiveAudio(true);
      await descAudioRef.current.play();
    }
  }, [showDescriptiveAudio, isPlaying]);

  useEffect(() => {
    setActiveWordIdx(-1);
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    cancelAnimationFrame(animFrameRef.current);
  }, [currentPage]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      setIsPlaying(false);
      setActiveWordIdx(-1);
      cancelAnimationFrame(animFrameRef.current);
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    const audio = descAudioRef.current;
    if (!audio) return;
    const onEnded = () => setShowDescriptiveAudio(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  const goPage = (dir: -1 | 1) => {
    const next = currentPage + dir;
    if (next >= 0 && next < pages.length) setCurrentPage(next);
  };

  const duration = audioRef.current?.duration || 10;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="overflow-hidden rounded-3xl border-2 border-[#1351aa]/10 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-[#1351aa] to-[#4a7fd4] px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="size-6" />
          <div>
            <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Pollito Pito
            </h2>
            <p className="text-xs text-white/70">Cuento tradicional dominicano - Libro Digital Accesible</p>
          </div>
        </div>
        <Badge className="rounded-xl bg-white/20 text-white border-white/30">
          Pagina {currentPage + 1} de {pages.length}
        </Badge>
      </div>

      {/* Accessibility toolbar */}
      <div className="flex flex-wrap items-center gap-4 border-b bg-[#e3e2de]/30 px-6 py-3">
        <div className="flex items-center gap-2">
          <Hand className="size-4 text-[#7c4dff]" />
          <span className="text-xs font-medium text-gray-600">Lengua de Senas</span>
          <Switch checked={showSignLanguage} onCheckedChange={setShowSignLanguage} />
        </div>
        <div className="h-4 w-px bg-gray-300" />
        <Button
          size="sm"
          variant={showDescriptiveAudio ? "default" : "outline"}
          className="gap-1.5 rounded-xl text-xs"
          onClick={playDescriptive}
        >
          <Eye className="size-3.5" />
          {showDescriptiveAudio ? "Escuchando..." : "Audio Descripcion"}
        </Button>
        <div className="h-4 w-px bg-gray-300" />
        <Badge variant="outline" className="rounded-xl text-[10px] text-[#4caf50] border-[#4caf50]/30">
          <Accessibility className="mr-1 size-3" /> WCAG 2.0 AA
        </Badge>
      </div>

      {/* Book content */}
      <div className="relative flex flex-col lg:flex-row">
        {/* Image area */}
        <div className={`relative flex items-center justify-center bg-gradient-to-br ${page.bgColor} p-8 lg:w-1/2`}>
          <motion.div
            key={page.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Image
              src={page.image}
              alt={page.imageAlt}
              width={320}
              height={320}
              className="drop-shadow-xl"
              style={{ objectFit: "contain", maxHeight: 320 }}
            />
          </motion.div>

          {/* Sign language video overlay */}
          <AnimatePresence>
            {showSignLanguage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-4 right-4 w-52 overflow-hidden rounded-2xl bg-black shadow-2xl ring-2 ring-[#7c4dff]"
              >
                <video
                  key={page.signLanguageVideo}
                  src={page.signLanguageVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="aspect-video w-full object-cover"
                />
                <div className="flex items-center justify-between bg-[#7c4dff] px-3 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <Hand className="size-3.5 text-white" />
                    <span className="text-[11px] font-bold text-white">LSE Dominicana</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-2 animate-pulse rounded-full bg-green-400" />
                    <span className="text-[10px] text-green-200">Vivo</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Page navigation */}
          <button
            onClick={() => goPage(-1)}
            disabled={currentPage === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-all hover:bg-white disabled:opacity-30"
            aria-label="Pagina anterior"
          >
            <ChevronLeft className="size-5 text-gray-700" />
          </button>
          <button
            onClick={() => goPage(1)}
            disabled={currentPage === pages.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-all hover:bg-white disabled:opacity-30"
            aria-label="Pagina siguiente"
          >
            <ChevronRight className="size-5 text-gray-700" />
          </button>
        </div>

        {/* Text area with highlighted reading */}
        <div className="flex flex-col justify-between p-8 lg:w-1/2">
          <div>
            <motion.div
              key={page.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 min-h-[120px] rounded-2xl bg-white p-6 shadow-inner"
              role="region"
              aria-label="Texto del cuento con lectura resaltada"
              aria-live="polite"
            >
              <p className="text-xl leading-relaxed" style={{ fontFamily: "var(--font-heading)" }}>
                {page.words.map((w, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-all duration-100 ${
                      activeWordIdx === i
                        ? "rounded-lg bg-[#ffc107] px-1 py-0.5 font-bold text-gray-900 scale-110 shadow-sm"
                        : "text-gray-700"
                    }`}
                    style={activeWordIdx === i ? { transform: "scale(1.05)" } : undefined}
                  >
                    {w.word}{" "}
                  </span>
                ))}
              </p>
            </motion.div>

            {/* Audio description text */}
            <AnimatePresence>
              {showDescriptiveAudio && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 rounded-xl border-2 border-[#ff8c42]/30 bg-[#ff8c42]/5 p-4"
                >
                  <p className="flex items-center gap-2 text-xs font-bold text-[#ff8c42]">
                    <Eye className="size-4" /> Audio Descripcion activa
                  </p>
                  <p className="mt-1 text-sm italic text-gray-600">&ldquo;{page.imageAlt}&rdquo;</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Audio player controls */}
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl"
                onClick={() => goPage(-1)}
                disabled={currentPage === 0}
                aria-label="Pagina anterior"
              >
                <SkipBack className="size-5" />
              </Button>
              <Button
                size="lg"
                className="gap-2 rounded-2xl bg-[#1351aa] px-8 hover:bg-[#1351aa]/90"
                onClick={play}
                aria-label={isPlaying ? "Pausar narracion" : "Reproducir narracion"}
              >
                {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                {isPlaying ? "Pausar" : "Escuchar"}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl"
                onClick={() => goPage(1)}
                disabled={currentPage === pages.length - 1}
                aria-label="Pagina siguiente"
              >
                <SkipForward className="size-5" />
              </Button>
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              Las palabras se resaltan automaticamente mientras escuchas la narracion
            </p>
          </div>
        </div>
      </div>

      {/* Hidden audio elements */}
      <audio ref={audioRef} src={page.audio} preload="auto" />
      <audio ref={descAudioRef} src={page.descriptiveAudio} preload="auto" />
    </Card>
  );
}

/* ================================================================== */
/*  Interactive Activity: Selecciona la letra                          */
/* ================================================================== */

interface LetterOption {
  letter: string;
  audio: string;
  correct: boolean;
}

const activityLetters: LetterOption[] = [
  { letter: "P", audio: "/demo/audios/activities/Actividad1_p.wav", correct: true },
  { letter: "O", audio: "/demo/audios/activities/Actividad1_o.wav", correct: false },
  { letter: "L", audio: "/demo/audios/activities/Actividad1_l.wav", correct: false },
  { letter: "I", audio: "/demo/audios/activities/Actividad1_i.wav", correct: false },
  { letter: "T", audio: "/demo/audios/activities/Actividad1_t.wav", correct: false },
];

function LetterActivity() {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const feedbackRef = useRef<HTMLAudioElement>(null);
  const letterAudioRef = useRef<HTMLAudioElement>(null);
  const instructionRef = useRef<HTMLAudioElement>(null);

  const questions = [
    { prompt: "Cual es la primera letra de POLLITO?", correctLetter: "P", word: "Pollito", image: "/demo/images/characters/pollito_pito_completo.png" },
    { prompt: "Cual es la primera letra de CIRUELA?", correctLetter: "C", word: "Ciruela", image: "/demo/images/characters/ciruela.png" },
    { prompt: "Cual es la primera letra de GALLINA?", correctLetter: "G", word: "Gallina", image: "/demo/images/characters/gallina_fina.png" },
  ];

  const q = questions[questionIdx];
  const letters = questionIdx === 0
    ? ["P", "O", "L", "I", "T"]
    : questionIdx === 1
    ? ["C", "A", "R", "U", "E"]
    : ["G", "F", "Z", "P", "R"];

  const handleSelect = async (letter: string) => {
    setSelected(letter);
    setAttempts((a) => a + 1);

    // Play letter audio
    const letterOpt = activityLetters.find((l) => l.letter === letter);
    if (letterOpt && letterAudioRef.current) {
      letterAudioRef.current.src = letterOpt.audio;
      try { await letterAudioRef.current.play(); } catch {}
    }

    const isCorrect = letter === q.correctLetter;
    setResult(isCorrect ? "correct" : "wrong");

    // Play feedback after short delay
    setTimeout(async () => {
      if (feedbackRef.current) {
        feedbackRef.current.src = isCorrect
          ? "/demo/audios/feedback/muy-bien.wav"
          : "/demo/audios/feedback/intenta-de-nuevo.wav";
        try { await feedbackRef.current.play(); } catch {}
      }
    }, 400);

    if (isCorrect) {
      setScore((s) => s + 1);
      setTimeout(() => {
        if (questionIdx < questions.length - 1) {
          setQuestionIdx((i) => i + 1);
          setSelected(null);
          setResult(null);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setSelected(null);
        setResult(null);
      }, 1500);
    }
  };

  const reset = () => {
    setQuestionIdx(0);
    setSelected(null);
    setResult(null);
    setScore(0);
    setAttempts(0);
  };

  const allDone = questionIdx === questions.length - 1 && result === "correct";

  return (
    <Card className="overflow-hidden rounded-3xl border-2 border-[#ff8c42]/20 shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-[#ff8c42] to-[#ffc107] text-white">
        <CardTitle className="flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
          <Sparkles className="size-6" />
          Actividad: Selecciona la Letra
          <Badge className="ml-auto rounded-xl bg-white/20 text-white border-white/30">
            {score}/{questions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {allDone ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <div className="flex size-24 items-center justify-center rounded-full bg-[#4caf50]/10">
              <CheckCircle2 className="size-14 text-[#4caf50]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
              Excelente!
            </h3>
            <p className="text-sm text-muted-foreground">
              Completaste todas las preguntas. Puntaje: {score}/{questions.length} en {attempts} intentos
            </p>
            <Button onClick={reset} className="gap-2 rounded-xl">
              <RotateCcw className="size-4" /> Jugar de Nuevo
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Question */}
            <div className="flex items-center gap-4">
              <div className="relative size-20 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-2">
                <Image src={q.image} alt={q.word} fill className="object-contain p-1" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                  {q.prompt}
                </p>
                <p className="text-sm text-muted-foreground">
                  Toca la letra correcta. La palabra es: <strong>{q.word}</strong>
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="ml-auto rounded-xl"
                onClick={async () => {
                  if (instructionRef.current) {
                    instructionRef.current.src = "/demo/audios/activities/Actividad1_SeleccionaLaLetra.wav";
                    try { await instructionRef.current.play(); } catch {}
                  }
                }}
                aria-label="Escuchar instrucciones"
              >
                <Volume2 className="size-5 text-[#1351aa]" />
              </Button>
            </div>

            {/* Letter options */}
            <div className="flex justify-center gap-4">
              {letters.map((letter) => {
                const isSelected = selected === letter;
                const isCorrectLetter = letter === q.correctLetter;
                let bg = "bg-white border-2 border-gray-200 hover:border-[#1351aa] hover:bg-[#1351aa]/5";
                if (isSelected && result === "correct") bg = "bg-[#4caf50] border-2 border-[#4caf50] text-white scale-110";
                if (isSelected && result === "wrong") bg = "bg-red-500 border-2 border-red-500 text-white animate-wiggle";

                return (
                  <motion.button
                    key={letter}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !selected && handleSelect(letter)}
                    disabled={!!selected}
                    className={`flex size-16 items-center justify-center rounded-2xl text-2xl font-bold shadow-md transition-all ${bg}`}
                    style={{ fontFamily: "var(--font-heading)" }}
                    aria-label={`Letra ${letter}`}
                  >
                    {letter}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback with sign language video */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-4 rounded-2xl p-4 ${
                    result === "correct" ? "bg-[#4caf50]/10 text-[#4caf50]" : "bg-red-50 text-red-500"
                  }`}
                >
                  {result === "correct" && (
                    <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-black">
                      <video
                        src="/demo/videos/activities/MUYBIEN.webm"
                        autoPlay
                        muted
                        playsInline
                        className="size-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {result === "correct" ? (
                      <CheckCircle2 className="size-6" />
                    ) : (
                      <XCircle className="size-6" />
                    )}
                    <p className="font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                      {result === "correct" ? "Muy bien!" : "Intenta de nuevo!"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Progreso:</span>
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`size-3 rounded-full transition-colors ${
                      i < questionIdx ? "bg-[#4caf50]" : i === questionIdx ? "bg-[#ff8c42]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-auto text-xs text-muted-foreground">
                Pregunta {questionIdx + 1} de {questions.length}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <audio ref={feedbackRef} preload="none" />
      <audio ref={letterAudioRef} preload="none" />
      <audio ref={instructionRef} preload="none" />
    </Card>
  );
}

/* ================================================================== */
/*  Glossary with audio and images                                     */
/* ================================================================== */

function Glossary() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [showLSE, setShowLSE] = useState(true);

  const playWord = async (word: string, src: string) => {
    if (!audioRef.current) return;
    if (playingWord === word) {
      audioRef.current.pause();
      setPlayingWord(null);
      return;
    }
    audioRef.current.src = src;
    setPlayingWord(word);
    try { await audioRef.current.play(); } catch {}
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setPlayingWord(null);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  return (
    <Card className="overflow-hidden rounded-3xl border-2 border-[#7c4dff]/20 shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-[#7c4dff] to-[#b388ff] text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
            <HelpCircle className="size-6" />
            Glosario Interactivo
          </CardTitle>
          <div className="flex items-center gap-2">
            <Hand className="size-4" />
            <span className="text-xs">LSE</span>
            <Switch checked={showLSE} onCheckedChange={setShowLSE} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-4 text-sm text-muted-foreground">
          Toca cada palabra para escuchar su pronunciacion y ver la sena en Lengua de Senas Dominicana.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {glossaryItems.map((item) => {
            const isActive = playingWord === item.word;
            return (
              <motion.div
                key={item.word}
                whileHover={{ y: -2 }}
                className={`overflow-hidden rounded-2xl border-2 transition-all ${
                  isActive
                    ? "border-[#7c4dff] bg-[#7c4dff]/5 shadow-md"
                    : "border-gray-100 bg-white hover:border-[#7c4dff]/30 hover:shadow-sm"
                }`}
              >
                {/* Sign language video */}
                {showLSE && isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="bg-black"
                  >
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="aspect-video w-full object-cover"
                    />
                  </motion.div>
                )}
                <button
                  onClick={() => playWord(item.word, item.audio)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-violet-50">
                    <Image src={item.image} alt={item.word} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                        {item.word}
                      </p>
                      {isActive ? (
                        <VolumeX className="size-4 text-[#7c4dff]" />
                      ) : (
                        <Volume2 className="size-4 text-gray-400" />
                      )}
                      {showLSE && (
                        <Hand className="size-3.5 text-[#7c4dff]/50" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{item.definition}</p>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
      <audio ref={audioRef} preload="none" />
    </Card>
  );
}

/* ================================================================== */
/*  Main Page                                                          */
/* ================================================================== */

export default function DemoLibroPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div>
        <h1
          className="flex items-center gap-3 text-2xl font-bold text-gray-900"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <BookOpen className="size-8 text-[#1351aa]" />
          Demo: Libro Digital Accesible
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Basado en el proyecto <strong>Libros Accesibles RD</strong> de UNICEF. Cuento &ldquo;Pollito Pito&rdquo; con narracion real,
          lectura resaltada por palabra, audio descripcion, lengua de senas y actividades interactivas.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge className="rounded-xl bg-[#ffc107]/10 text-[#b8860b] border-[#ffc107]/30">Lectura Resaltada</Badge>
          <Badge className="rounded-xl bg-[#7c4dff]/10 text-[#7c4dff] border-[#7c4dff]/30">Lengua de Senas</Badge>
          <Badge className="rounded-xl bg-[#ff8c42]/10 text-[#ff8c42] border-[#ff8c42]/30">Audio Descripcion</Badge>
          <Badge className="rounded-xl bg-[#4caf50]/10 text-[#4caf50] border-[#4caf50]/30">Actividad Interactiva</Badge>
          <Badge className="rounded-xl bg-[#1351aa]/10 text-[#1351aa] border-[#1351aa]/30">Audio Real UNICEF</Badge>
        </div>
      </div>

      {/* Book Reader */}
      <BookReader />

      {/* Activity */}
      <LetterActivity />

      {/* Glossary */}
      <Glossary />
    </div>
  );
}
