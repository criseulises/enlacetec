"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import {
  Accessibility,
  Eye,
  Hand,
  Volume2,
  Palette,
  Keyboard,
  Monitor,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Award,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAccessibility } from "@/lib/store";
import { type ContrastTheme } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const demoText =
  "La Republica Dominicana ocupa los dos tercios orientales de la isla La Espanola en el mar Caribe. Su capital es Santo Domingo, la ciudad mas antigua fundada por europeos en el continente americano. El pais cuenta con una rica biodiversidad que incluye playas de arena blanca, montanas como el Pico Duarte, y bosques tropicales llenos de vida silvestre. La educacion es un pilar fundamental para el desarrollo de las comunidades dominicanas.";

const demoWords = demoText.split(" ");

const audioDescriptionText =
  "Esta imagen muestra una clase virtual con 3 estudiantes y una voluntaria explicando fracciones en una pizarra digital";

const contrastPreviews: {
  id: ContrastTheme;
  label: string;
  bg: string;
  fg: string;
  accent: string;
}[] = [
  { id: "normal", label: "Normal", bg: "#ffffff", fg: "#1a1a1a", accent: "#1351aa" },
  { id: "sepia", label: "Sepia", bg: "#f4e4c1", fg: "#5b4636", accent: "#8b6914" },
  { id: "noche", label: "Noche", bg: "#1a1a2e", fg: "#e0e0e0", accent: "#7c4dff" },
  { id: "verde", label: "Verde", bg: "#e8f5e9", fg: "#1b5e20", accent: "#4caf50" },
  {
    id: "alto-contraste",
    label: "Alto Contraste",
    bg: "#000000",
    fg: "#ffffff",
    accent: "#ffff00",
  },
];

const keyboardShortcuts = [
  { keys: "Tab", description: "Navegar entre elementos" },
  { keys: "Enter / Space", description: "Activar elemento" },
  { keys: "Escape", description: "Cerrar dialogos" },
  { keys: "Alt + A", description: "Abrir panel de accesibilidad" },
  { keys: "Alt + L", description: "Activar lectura resaltada" },
  { keys: "Alt + S", description: "Activar lengua de senas" },
];

/* ------------------------------------------------------------------ */
/*  Highlighted-word reading hook                                      */
/* ------------------------------------------------------------------ */

function useHighlightedReading(
  words: string[],
  speed: number = 1,
  isPlaying: boolean
) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPlaying) {
      setActiveIndex(-1);
      return;
    }

    const baseMs = 350;
    const ms = baseMs / speed;
    let idx = 0;

    setActiveIndex(0);

    intervalRef.current = setInterval(() => {
      idx += 1;
      if (idx >= words.length) {
        idx = 0;
      }
      setActiveIndex(idx);
    }, ms);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [words.length, speed, isPlaying]);

  return activeIndex;
}

/* ------------------------------------------------------------------ */
/*  Feature cards                                                      */
/* ------------------------------------------------------------------ */

function ReadingHighlightCard() {
  const [playing, setPlaying] = useState(false);
  const { audioSpeed } = useAccessibility();
  const activeIndex = useHighlightedReading(demoWords, audioSpeed, playing);

  return (
    <Card className="group overflow-hidden border-2 border-[#ffc107]/30 bg-[#ffc107]/5 transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#ffc107]/20">
            <BookOpen className="size-5 text-[#ffc107]" />
          </div>
          Lectura Resaltada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-600">
          Las palabras se resaltan una a una mientras se leen en voz alta, facilitando el seguimiento visual de la lectura.
        </p>
        <div
          className="rounded-2xl bg-white p-4 text-sm leading-relaxed"
          aria-live="polite"
          role="region"
          aria-label="Demo de lectura resaltada"
        >
          {demoWords.slice(0, 20).map((word, i) => (
            <span
              key={i}
              className={`inline-block transition-colors duration-150 ${
                activeIndex === i
                  ? "rounded bg-[#ffc107] px-0.5 font-semibold text-gray-900"
                  : "text-gray-700"
              }`}
            >
              {word}{" "}
            </span>
          ))}
          <span className="text-gray-400">...</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? "Pausar lectura resaltada" : "Iniciar lectura resaltada"}
        >
          {playing ? (
            <Pause className="mr-2 size-4" />
          ) : (
            <Play className="mr-2 size-4" />
          )}
          {playing ? "Pausar" : "Iniciar"} Demo
        </Button>
      </CardContent>
    </Card>
  );
}

function SignLanguageCard() {
  return (
    <Card className="group overflow-hidden border-2 border-[#7c4dff]/30 bg-[#7c4dff]/5 transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#7c4dff]/20">
            <Hand className="size-5 text-[#7c4dff]" />
          </div>
          Lengua de Senas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-600">
          Integracion de interprete de Lengua de Senas Espanola para videoconferencias y contenido multimedia.
        </p>
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#7c4dff]/20 to-[#7c4dff]/5 border border-[#7c4dff]/20">
          <div className="flex flex-col items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex size-14 items-center justify-center rounded-full bg-[#7c4dff] text-white shadow-lg"
              aria-label="Reproducir video de lengua de senas (demo)"
            >
              <Play className="size-6 ml-0.5" />
            </motion.button>
            <Badge className="rounded-xl bg-[#7c4dff]/10 text-[#7c4dff] border-[#7c4dff]/20">
              Interprete LSE Dominicana
            </Badge>
          </div>
          <div className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] text-white">
            Avatar 3D / Interprete en vivo
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AudioDescriptionCard() {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(() => {
    if (speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      return;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(audioDescriptionText);
      utterance.lang = "es-DO";
      utterance.rate = 0.9;
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  }, [speaking]);

  return (
    <Card className="group overflow-hidden border-2 border-[#ff8c42]/30 bg-[#ff8c42]/5 transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#ff8c42]/20">
            <Volume2 className="size-5 text-[#ff8c42]" />
          </div>
          Audio Descripcion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-600">
          El contenido visual se narra automaticamente para estudiantes con discapacidad visual.
        </p>
        <div className="rounded-2xl bg-white p-4 text-sm italic text-gray-500 border border-[#ff8c42]/20">
          &ldquo;{audioDescriptionText}&rdquo;
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          onClick={speak}
          aria-label={speaking ? "Detener audio descripcion" : "Reproducir audio descripcion"}
        >
          {speaking ? (
            <Pause className="mr-2 size-4" />
          ) : (
            <Volume2 className="mr-2 size-4" />
          )}
          {speaking ? "Detener" : "Escuchar"} Descripcion
        </Button>
      </CardContent>
    </Card>
  );
}

function ContrastThemesCard() {
  const { contrastTheme, setContrastTheme } = useAccessibility();

  return (
    <Card className="group overflow-hidden border-2 border-[#4caf50]/30 bg-[#4caf50]/5 transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#4caf50]/20">
            <Palette className="size-5 text-[#4caf50]" />
          </div>
          Contraste y Temas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-600">
          Cinco temas de contraste diseñados para diferentes necesidades visuales y condiciones de iluminacion.
        </p>
        <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Temas de contraste">
          {contrastPreviews.map((theme) => (
            <button
              key={theme.id}
              role="radio"
              aria-checked={contrastTheme === theme.id}
              onClick={() => setContrastTheme(theme.id)}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#4caf50]/40 ${
                contrastTheme === theme.id
                  ? "ring-2 ring-[#4caf50] bg-white"
                  : "hover:bg-white/50"
              }`}
            >
              <div
                className="flex size-10 items-center justify-center rounded-lg border text-[10px] font-bold"
                style={{
                  backgroundColor: theme.bg,
                  color: theme.fg,
                  borderColor: theme.accent,
                }}
              >
                Aa
              </div>
              <span className="text-[10px] font-medium text-gray-600 leading-tight text-center">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function KeyboardNavigationCard() {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const items = ["Inicio", "Cursos", "Ayuda", "Perfil"];

  return (
    <Card className="group overflow-hidden border-2 border-[#1351aa]/30 bg-[#1351aa]/5 transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#1351aa]/20">
            <Keyboard className="size-5 text-[#1351aa]" />
          </div>
          Navegacion por Teclado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-600">
          Todos los elementos interactivos son accesibles mediante teclado con indicadores de foco visibles.
        </p>
        <div
          className="flex gap-2 rounded-2xl bg-white p-4 border border-[#1351aa]/20"
          role="presentation"
          aria-label="Demo de navegacion por teclado"
        >
          {items.map((item, i) => (
            <div
              key={item}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition-all duration-300 ${
                focusedIndex === i
                  ? "bg-[#1351aa] text-white ring-2 ring-[#1351aa]/40 ring-offset-2 scale-105"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[10px] font-bold">Tab</kbd>
          <span>navega al siguiente elemento</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ScreenReaderCard() {
  const readers = [
    { name: "NVDA", platform: "Windows" },
    { name: "VoiceOver", platform: "macOS / iOS" },
    { name: "JAWS", platform: "Windows" },
    { name: "TalkBack", platform: "Android" },
  ];

  return (
    <Card className="group overflow-hidden border-2 border-[#ff6b9d]/30 bg-[#ff6b9d]/5 transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#ff6b9d]/20">
            <Monitor className="size-5 text-[#ff6b9d]" />
          </div>
          Compatible con Lectores de Pantalla
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-gray-600">
          Implementacion completa de WAI-ARIA para compatibilidad con los principales lectores de pantalla.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {readers.map((reader) => (
            <div
              key={reader.name}
              className="flex items-center gap-2 rounded-xl bg-white p-3 border border-[#ff6b9d]/20"
            >
              <CheckCircle2 className="size-4 text-[#4caf50] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {reader.name}
                </p>
                <p className="text-[10px] text-gray-500">{reader.platform}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Live demo section                                                  */
/* ------------------------------------------------------------------ */

function LiveDemoSection() {
  const [playing, setPlaying] = useState(false);
  const {
    audioSpeed,
    fontSize,
    fontFamily,
    contrastTheme,
    setAudioSpeed,
    setFontSize,
    setFontFamily,
    setContrastTheme,
  } = useAccessibility();

  const activeIndex = useHighlightedReading(demoWords, audioSpeed, playing);

  const themeStyles: Record<ContrastTheme, { bg: string; fg: string }> = {
    normal: { bg: "#ffffff", fg: "#1a1a1a" },
    sepia: { bg: "#f4e4c1", fg: "#5b4636" },
    noche: { bg: "#1a1a2e", fg: "#e0e0e0" },
    verde: { bg: "#e8f5e9", fg: "#1b5e20" },
    "alto-contraste": { bg: "#000000", fg: "#ffffff" },
  };

  const style = themeStyles[contrastTheme];

  return (
    <motion.section variants={fadeInUp} aria-labelledby="live-demo-heading">
      <Card className="overflow-hidden border-2 border-[#7c4dff]/20">
        <CardHeader>
          <CardTitle
            id="live-demo-heading"
            className="flex items-center gap-3 text-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#7c4dff]/10">
              <Eye className="size-5 text-[#7c4dff]" />
            </div>
            Demo Interactiva
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text display */}
          <div
            className="rounded-2xl p-6 transition-colors duration-300"
            style={{
              backgroundColor: style.bg,
              color: style.fg,
              fontSize: `${fontSize}px`,
              fontFamily:
                fontFamily === "moderna"
                  ? "'Nunito', sans-serif"
                  : "'Fredoka', cursive",
              lineHeight: 1.8,
            }}
            role="region"
            aria-label="Area de demo de lectura"
            aria-live="polite"
          >
            {demoWords.map((word, i) => (
              <span
                key={i}
                className={`inline-block transition-all duration-150 ${
                  activeIndex === i
                    ? "rounded px-0.5 font-bold"
                    : ""
                }`}
                style={
                  activeIndex === i
                    ? { backgroundColor: "#ffc107", color: "#1a1a1a" }
                    : undefined
                }
              >
                {word}{" "}
              </span>
            ))}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl bg-gray-50 p-4">
            {/* Play/Pause */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-600">Reproduccion</span>
              <div className="flex gap-2">
                <Button
                  variant={playing ? "default" : "outline"}
                  size="sm"
                  className="flex-1 rounded-xl"
                  onClick={() => setPlaying(!playing)}
                  aria-label={playing ? "Pausar lectura" : "Reproducir lectura"}
                >
                  {playing ? (
                    <Pause className="mr-1 size-4" />
                  ) : (
                    <Play className="mr-1 size-4" />
                  )}
                  {playing ? "Pausa" : "Play"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setPlaying(false)}
                  aria-label="Reiniciar lectura"
                >
                  <RotateCcw className="size-4" />
                </Button>
              </div>
            </div>

            {/* Speed */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-600">
                Velocidad: {audioSpeed.toFixed(1)}x
              </span>
              <Slider
                value={[audioSpeed]}
                onValueChange={(val) => setAudioSpeed(Array.isArray(val) ? val[0] : val)}
                min={0.5}
                max={2}
                step={0.1}
                aria-label="Velocidad de lectura"
              />
            </div>

            {/* Font Size */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-600">
                Texto: {fontSize}px
              </span>
              <Slider
                value={[fontSize]}
                onValueChange={(val) => setFontSize(Array.isArray(val) ? val[0] : val)}
                min={14}
                max={32}
                step={1}
                aria-label="Tamano de texto"
              />
            </div>

            {/* Font Family */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-600">Tipografia</span>
              <div className="flex gap-2">
                <Button
                  variant={fontFamily === "moderna" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 rounded-xl text-xs"
                  onClick={() => setFontFamily("moderna")}
                >
                  Moderna
                </Button>
                <Button
                  variant={fontFamily === "lectura-facil" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 rounded-xl text-xs"
                  onClick={() => setFontFamily("lectura-facil")}
                >
                  Facil
                </Button>
              </div>
            </div>
          </div>

          {/* Contrast selector */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-gray-600">Contraste:</span>
            {contrastPreviews.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setContrastTheme(theme.id)}
                className={`flex items-center gap-1.5 rounded-xl border-2 px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/40 ${
                  contrastTheme === theme.id
                    ? "border-[#7c4dff] bg-[#7c4dff]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-pressed={contrastTheme === theme.id}
              >
                <span
                  className="size-4 rounded-full border"
                  style={{ backgroundColor: theme.bg, borderColor: theme.accent }}
                />
                {theme.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function AccesibilidadPage() {
  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Hero */}
      <motion.div variants={fadeInUp}>
        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#7c4dff] to-[#7c4dff]/80 text-white shadow-lg">
          <CardContent className="relative flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20">
                  <Accessibility className="size-7" />
                </div>
                <h1
                  className="text-3xl font-bold sm:text-4xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Accesibilidad Total
                </h1>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-white/90">
                EnlaceTEC esta diseñado siguiendo los estandares WCAG 2.0 AA y los principios
                del Diseño Universal para el Aprendizaje (DUA). Cada estudiante merece una
                experiencia educativa adaptada a sus necesidades, sin barreras.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge className="rounded-xl bg-white/20 text-white border-white/30">
                  WCAG 2.0 AA
                </Badge>
                <Badge className="rounded-xl bg-white/20 text-white border-white/30">
                  WAI-ARIA
                </Badge>
                <Badge className="rounded-xl bg-white/20 text-white border-white/30">
                  DUA
                </Badge>
              </div>
            </div>
            {/* Decorative */}
            <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-6 right-20 size-24 rounded-full bg-white/5" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Feature cards grid */}
      <motion.div variants={fadeInUp}>
        <h2
          className="mb-4 text-xl font-bold text-gray-800"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Funcionalidades de Accesibilidad
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={stagger}
      >
        <motion.div variants={fadeInUp}>
          <ReadingHighlightCard />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <SignLanguageCard />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <AudioDescriptionCard />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <ContrastThemesCard />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <KeyboardNavigationCard />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <ScreenReaderCard />
        </motion.div>
      </motion.div>

      {/* Live demo */}
      <LiveDemoSection />

      {/* Standards compliance */}
      <motion.section variants={fadeInUp} aria-labelledby="standards-heading">
        <h2
          id="standards-heading"
          className="mb-4 text-xl font-bold text-gray-800"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Estandares y Cumplimiento
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-[#4caf50]/20 bg-[#4caf50]/5">
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#4caf50]/20">
                <ShieldCheck className="size-7 text-[#4caf50]" />
              </div>
              <h3 className="font-bold text-gray-800">WCAG 2.0 AA</h3>
              <p className="text-xs text-gray-600">
                Cumplimiento de las pautas de accesibilidad para contenido web nivel AA
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#1351aa]/20 bg-[#1351aa]/5">
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#1351aa]/20">
                <Accessibility className="size-7 text-[#1351aa]" />
              </div>
              <h3 className="font-bold text-gray-800">WAI-ARIA</h3>
              <p className="text-xs text-gray-600">
                Atributos ARIA en todos los componentes interactivos para tecnologias asistivas
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#7c4dff]/20 bg-[#7c4dff]/5">
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#7c4dff]/20">
                <Award className="size-7 text-[#7c4dff]" />
              </div>
              <h3 className="font-bold text-gray-800">DUA</h3>
              <p className="text-xs text-gray-600">
                Diseño Universal para el Aprendizaje con multiples formas de representacion
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ff8c42]/20 bg-[#ff8c42]/5">
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#ff8c42]/20">
                <BookOpen className="size-7 text-[#ff8c42]" />
              </div>
              <h3 className="font-bold text-gray-800">UNICEF</h3>
              <p className="text-xs text-gray-600">
                Basado en trabajo previo con UNICEF en el proyecto Libros Accesibles RD
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Keyboard shortcuts */}
      <motion.section variants={fadeInUp} aria-labelledby="shortcuts-heading">
        <h2
          id="shortcuts-heading"
          className="mb-4 text-xl font-bold text-gray-800"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Atajos de Teclado
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-xl" role="table" aria-label="Atajos de teclado">
              <div className="grid grid-cols-2 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500" role="row">
                <span role="columnheader">Tecla</span>
                <span role="columnheader">Accion</span>
              </div>
              {keyboardShortcuts.map((shortcut, i) => (
                <div
                  key={shortcut.keys}
                  className={`grid grid-cols-2 px-6 py-3 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                  role="row"
                >
                  <span role="cell">
                    {shortcut.keys.split(" / ").map((key, ki) => (
                      <span key={ki}>
                        {ki > 0 && <span className="mx-1 text-gray-400">/</span>}
                        {key.split(" + ").map((k, kki) => (
                          <span key={kki}>
                            {kki > 0 && <span className="mx-1 text-gray-400">+</span>}
                            <kbd className="rounded-lg bg-gray-100 border border-gray-200 px-2 py-1 font-mono text-xs font-bold text-gray-700 shadow-sm">
                              {k}
                            </kbd>
                          </span>
                        ))}
                      </span>
                    ))}
                  </span>
                  <span role="cell" className="text-gray-700">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
}
