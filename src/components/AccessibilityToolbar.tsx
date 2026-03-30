"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Accessibility,
  X,
  RotateCcw,
  Sun,
  Moon,
  Leaf,
  Eye,
  Keyboard,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAppStore } from "@/lib/store";
import type { ContrastTheme } from "@/lib/mock-data";

const contrastThemes: {
  id: ContrastTheme;
  label: string;
  color: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "normal",
    label: "Normal",
    color: "#e3e2de",
    icon: <Sun className="size-3" />,
  },
  {
    id: "sepia",
    label: "Sepia",
    color: "#f4e4c1",
    icon: <Sun className="size-3" />,
  },
  {
    id: "noche",
    label: "Noche",
    color: "#1a1a2e",
    icon: <Moon className="size-3" />,
  },
  {
    id: "verde",
    label: "Verde",
    color: "#4caf50",
    icon: <Leaf className="size-3" />,
  },
  {
    id: "alto-contraste",
    label: "Alto Contraste",
    color: "#000000",
    icon: <Eye className="size-3" />,
  },
];

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);

  const settings = useAppStore((s) => s.accessibilitySettings);
  const set = useAppStore((s) => s.setAccessibilitySetting);
  const resetAll = useAppStore((s) => s.resetAccessibilitySettings);

  const {
    contrastTheme,
    fontSize,
    fontFamily,
    audioSpeed,
    signLanguageEnabled,
    highlightedReadingEnabled,
    audioDescriptionEnabled,
  } = settings;

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Keyboard shortcut: Alt+A to toggle panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        togglePanel();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, togglePanel]);

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={togglePanel}
        className="fixed bottom-6 left-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#7c4dff] text-white shadow-lg hover:bg-[#6a3de8] focus:outline-none focus:ring-4 focus:ring-[#7c4dff]/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir panel de accesibilidad"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <Accessibility className="size-7" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Panel content */}
            <motion.div
              id="accessibility-panel"
              role="dialog"
              aria-label="Panel de accesibilidad"
              aria-modal="true"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 z-50 w-full max-w-md rounded-t-3xl bg-white shadow-2xl sm:bottom-6 sm:left-6 sm:rounded-3xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#7c4dff]/10">
                    <Accessibility className="size-5 text-[#7c4dff]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Accesibilidad
                    </h2>
                    <p className="text-xs text-gray-500">
                      Personaliza tu experiencia
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/40"
                    aria-label="Restaurar valores predeterminados"
                  >
                    <RotateCcw className="size-3.5" />
                    Restaurar valores
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex size-8 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/40"
                    aria-label="Cerrar panel de accesibilidad"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-6">
                {/* Contraste */}
                <section aria-labelledby="contrast-heading">
                  <h3
                    id="contrast-heading"
                    className="mb-3 text-sm font-semibold text-gray-700"
                  >
                    Contraste
                  </h3>
                  <div
                    className="flex flex-wrap gap-3"
                    role="radiogroup"
                    aria-label="Seleccionar tema de contraste"
                  >
                    {contrastThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => set("contrastTheme", theme.id)}
                        role="radio"
                        aria-checked={contrastTheme === theme.id}
                        className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/40 ${
                          contrastTheme === theme.id
                            ? "border-[#7c4dff] bg-[#7c4dff]/5 text-[#7c4dff]"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <span
                          className="flex size-6 items-center justify-center rounded-full border border-gray-200"
                          style={{ backgroundColor: theme.color }}
                          aria-hidden="true"
                        >
                          {theme.id === "noche" ||
                          theme.id === "alto-contraste" ? (
                            <span className="text-white">{theme.icon}</span>
                          ) : (
                            theme.icon
                          )}
                        </span>
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Tamano de Texto */}
                <section aria-labelledby="fontsize-heading">
                  <h3
                    id="fontsize-heading"
                    className="mb-3 text-sm font-semibold text-gray-700"
                  >
                    Tamano de Texto
                  </h3>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-sm text-gray-400"
                      aria-hidden="true"
                    >
                      A
                    </span>
                    <Slider
                      value={[fontSize]}
                      onValueChange={(val) =>
                        set("fontSize", Array.isArray(val) ? val[0] : val)
                      }
                      min={14}
                      max={32}
                      step={1}
                      aria-label="Tamano de texto"
                      aria-valuemin={14}
                      aria-valuemax={32}
                      aria-valuenow={fontSize}
                      aria-valuetext={`${fontSize} pixeles`}
                    />
                    <span
                      className="text-lg font-bold text-gray-600"
                      aria-hidden="true"
                    >
                      A+
                    </span>
                    <span className="min-w-[3ch] text-center text-xs font-medium text-[#7c4dff]">
                      {fontSize}px
                    </span>
                  </div>
                </section>

                {/* Tipografia */}
                <section aria-labelledby="font-heading">
                  <h3
                    id="font-heading"
                    className="mb-3 text-sm font-semibold text-gray-700"
                  >
                    Tipografia
                  </h3>
                  <div
                    className="flex gap-3"
                    role="radiogroup"
                    aria-label="Seleccionar tipografia"
                  >
                    <button
                      role="radio"
                      aria-checked={fontFamily === "moderna"}
                      onClick={() => set("fontFamily", "moderna")}
                      className={`flex-1 rounded-2xl border-2 px-4 py-3 text-center text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/40 ${
                        fontFamily === "moderna"
                          ? "border-[#7c4dff] bg-[#7c4dff]/5 text-[#7c4dff]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      Moderna
                    </button>
                    <button
                      role="radio"
                      aria-checked={fontFamily === "lectura-facil"}
                      onClick={() => set("fontFamily", "lectura-facil")}
                      className={`flex-1 rounded-2xl border-2 px-4 py-3 text-center text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/40 ${
                        fontFamily === "lectura-facil"
                          ? "border-[#7c4dff] bg-[#7c4dff]/5 text-[#7c4dff]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      style={{ fontFamily: "'Fredoka', cursive" }}
                    >
                      Lectura Facil
                    </button>
                  </div>
                </section>

                {/* Velocidad de Audio */}
                <section aria-labelledby="audiospeed-heading">
                  <h3
                    id="audiospeed-heading"
                    className="mb-3 text-sm font-semibold text-gray-700"
                  >
                    Velocidad de Audio
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-gray-400">
                      0.5x
                    </span>
                    <Slider
                      value={[audioSpeed]}
                      onValueChange={(val) =>
                        set("audioSpeed", Array.isArray(val) ? val[0] : val)
                      }
                      min={0.5}
                      max={2}
                      step={0.1}
                      aria-label="Velocidad de audio"
                      aria-valuemin={0.5}
                      aria-valuemax={2}
                      aria-valuenow={audioSpeed}
                      aria-valuetext={`${audioSpeed}x`}
                    />
                    <span className="text-xs font-medium text-gray-400">
                      2x
                    </span>
                    <span className="min-w-[3ch] text-center text-xs font-medium text-[#7c4dff]">
                      {audioSpeed.toFixed(1)}x
                    </span>
                  </div>
                </section>

                {/* Toggle switches */}
                <section className="space-y-4">
                  {/* Lengua de Senas */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">
                        Lengua de Senas
                      </h3>
                      <p className="text-xs text-gray-500">
                        Mostrar interprete LSE en videoconferencias
                      </p>
                    </div>
                    <Switch
                      checked={signLanguageEnabled}
                      onCheckedChange={(val: boolean) =>
                        set("signLanguageEnabled", val)
                      }
                      aria-label="Activar lengua de senas"
                    />
                  </div>

                  {/* Lectura Resaltada */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">
                        Lectura Resaltada
                      </h3>
                      <p className="text-xs text-gray-500">
                        Resaltar palabras mientras se leen en voz alta
                      </p>
                    </div>
                    <Switch
                      checked={highlightedReadingEnabled}
                      onCheckedChange={(val: boolean) =>
                        set("highlightedReadingEnabled", val)
                      }
                      aria-label="Activar lectura resaltada"
                    />
                  </div>

                  {/* Audio Descripcion */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">
                        Audio Descripcion
                      </h3>
                      <p className="text-xs text-gray-500">
                        Narrar contenido visual automaticamente
                      </p>
                    </div>
                    <Switch
                      checked={audioDescriptionEnabled}
                      onCheckedChange={(val: boolean) =>
                        set("audioDescriptionEnabled", val)
                      }
                      aria-label="Activar audio descripcion"
                    />
                  </div>
                </section>

                {/* Navegacion por Teclado */}
                <section
                  aria-labelledby="keyboard-heading"
                  className="rounded-2xl bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Keyboard className="size-4 text-[#7c4dff]" />
                    <h3
                      id="keyboard-heading"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Navegacion por Teclado
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500">
                    Usa{" "}
                    <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[10px] font-bold">
                      Tab
                    </kbd>{" "}
                    para navegar,{" "}
                    <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[10px] font-bold">
                      Enter
                    </kbd>{" "}
                    para activar,{" "}
                    <kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[10px] font-bold">
                      Escape
                    </kbd>{" "}
                    para cerrar
                  </p>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
