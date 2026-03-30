// Mock data for EnlaceTEC educational platform

// ============================================================
// Shared types & data used by the Zustand store
// ============================================================

export type ContrastTheme =
  | "normal"
  | "sepia"
  | "noche"
  | "verde"
  | "alto-contraste";

export type FontFamily = "moderna" | "lectura-facil";

export type AccessibilitySettings = {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  contrastTheme: ContrastTheme;
  fontFamily: FontFamily;
  audioSpeed: number;
  signLanguageEnabled: boolean;
  highlightedReadingEnabled: boolean;
  audioDescriptionEnabled: boolean;
};

export const defaultAccessibilitySettings: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  screenReader: false,
  contrastTheme: "normal",
  fontFamily: "moderna",
  audioSpeed: 1,
  signLanguageEnabled: false,
  highlightedReadingEnabled: false,
  audioDescriptionEnabled: false,
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Nueva sesión asignada",
    message: "Tienes una sesión de Matemáticas a las 10:00 AM.",
    read: false,
    date: "2026-03-30",
  },
  {
    id: "n2",
    title: "Insignia obtenida",
    message: "Ganaste la insignia Explorador Científico.",
    read: true,
    date: "2026-03-29",
  },
];

export const students = [
  {
    id: "s1",
    name: "María José",
    avatar:
      "https://ui-avatars.com/api/?name=Maria+Jose&background=ff6b9d&color=fff&rounded=true&bold=true",
  },
];

export const volunteers = [
  {
    id: "vol1",
    name: "Carlos Méndez",
    photo:
      "https://ui-avatars.com/api/?name=Carlos+Mendez&background=1351aa&color=fff&rounded=true&bold=true",
  },
];

export const currentStudent = {
  id: "s1",
  name: "María José",
  avatar: "https://ui-avatars.com/api/?name=Maria+Jose&background=ff6b9d&color=fff&rounded=true&bold=true",
  grade: "5to Primaria",
  ctc: "CTC Los Mina",
  progress: 72,
  hoursLearned: 34,
};

export const stats = {
  sesionesHoy: 3,
  sesionesHoyTrend: "+1 vs ayer",
  voluntariosActivos: 12,
  voluntariosActivosTrend: "+3 esta semana",
  tuProgreso: 72,
  tuProgresoTrend: "+5% esta semana",
  horasAprendidas: 34,
  horasAprendidasTrend: "+4h esta semana",
};

export const proximasSesiones = [
  {
    id: "ps1",
    subject: "Matemáticas",
    time: "10:00 AM",
    date: "Hoy",
    volunteerName: "Carlos Rivera",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Carlos+Rivera&background=1351aa&color=fff&rounded=true&bold=true",
    color: "#1351aa",
  },
  {
    id: "ps2",
    subject: "Ciencias",
    time: "11:30 AM",
    date: "Hoy",
    volunteerName: "Ana Martínez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Ana+Martinez&background=4caf50&color=fff&rounded=true&bold=true",
    color: "#4caf50",
  },
  {
    id: "ps3",
    subject: "Lectoescritura",
    time: "2:00 PM",
    date: "Hoy",
    volunteerName: "Pedro Sánchez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Pedro+Sanchez&background=7c4dff&color=fff&rounded=true&bold=true",
    color: "#7c4dff",
  },
  {
    id: "ps4",
    subject: "Programación",
    time: "9:00 AM",
    date: "Mañana",
    volunteerName: "Laura Gómez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Laura+Gomez&background=ff8c42&color=fff&rounded=true&bold=true",
    color: "#ff8c42",
  },
  {
    id: "ps5",
    subject: "Idiomas",
    time: "3:00 PM",
    date: "Mañana",
    volunteerName: "Miguel Torres",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Miguel+Torres&background=ffc107&color=fff&rounded=true&bold=true",
    color: "#ff6b9d",
  },
];

export const solicitudesPendientes = [
  {
    id: "sp1",
    subject: "Matemáticas",
    description: "Necesito ayuda con fracciones y decimales",
    urgency: "Urgente",
    status: "Pendiente",
    createdAt: "Hace 2 horas",
  },
  {
    id: "sp2",
    subject: "Ciencias",
    description: "No entiendo la fotosíntesis",
    urgency: "Normal",
    status: "Asignada",
    createdAt: "Hace 5 horas",
  },
  {
    id: "sp3",
    subject: "Programación",
    description: "Ayuda con un proyecto de Scratch",
    urgency: "Normal",
    status: "Pendiente",
    createdAt: "Ayer",
  },
];

export const progresoSemanal = [
  { day: "Lun", hours: 2.5 },
  { day: "Mar", hours: 1.5 },
  { day: "Mié", hours: 3 },
  { day: "Jue", hours: 2 },
  { day: "Vie", hours: 4 },
  { day: "Sáb", hours: 1 },
  { day: "Dom", hours: 0.5 },
];

export const actividadReciente = [
  {
    id: "ar1",
    type: "session",
    description: "Completaste una sesión de Matemáticas con Carlos Rivera",
    time: "Hace 1 hora",
    icon: "book",
  },
  {
    id: "ar2",
    type: "achievement",
    description: "Ganaste la insignia 'Explorador Científico'",
    time: "Hace 3 horas",
    icon: "trophy",
  },
  {
    id: "ar3",
    type: "help",
    description: "Tu solicitud de ayuda en Programación fue asignada",
    time: "Hace 5 horas",
    icon: "help",
  },
  {
    id: "ar4",
    type: "session",
    description: "Completaste una sesión de Lectoescritura con Pedro Sánchez",
    time: "Ayer",
    icon: "book",
  },
  {
    id: "ar5",
    type: "progress",
    description: "Tu progreso en Ciencias subió al 80%",
    time: "Ayer",
    icon: "chart",
  },
];

// Tutorías page data

export const sesionesEnVivo = [
  {
    id: "sv1",
    volunteerName: "Carlos Rivera",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Carlos+Rivera&background=1351aa&color=fff&rounded=true&bold=true",
    studentName: "María José",
    subject: "Matemáticas",
    duration: "23:45",
    topic: "Fracciones equivalentes",
  },
  {
    id: "sv2",
    volunteerName: "Ana Martínez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Ana+Martinez&background=4caf50&color=fff&rounded=true&bold=true",
    studentName: "Juan Pablo",
    subject: "Ciencias",
    duration: "15:30",
    topic: "El sistema solar",
  },
  {
    id: "sv3",
    volunteerName: "Laura Gómez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Laura+Gomez&background=ff8c42&color=fff&rounded=true&bold=true",
    studentName: "Sofía Hernández",
    subject: "Programación",
    duration: "42:10",
    topic: "Introducción a Scratch",
  },
  {
    id: "sv4",
    volunteerName: "Miguel Torres",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Miguel+Torres&background=ffc107&color=fff&rounded=true&bold=true",
    studentName: "Diego Ramírez",
    subject: "Idiomas",
    duration: "08:22",
    topic: "English greetings",
  },
];

export const chatMessages = [
  {
    id: "cm1",
    sender: "volunteer",
    name: "Carlos Rivera",
    message: "Muy bien, ahora vamos a practicar con otro ejemplo",
    time: "10:23",
  },
  {
    id: "cm2",
    sender: "student",
    name: "María José",
    message: "Ok! Ya entendí lo de las fracciones equivalentes",
    time: "10:24",
  },
  {
    id: "cm3",
    sender: "volunteer",
    name: "Carlos Rivera",
    message: "Excelente! Mira este ejercicio en la pizarra",
    time: "10:25",
  },
  {
    id: "cm4",
    sender: "student",
    name: "María José",
    message: "Sería 3/6 = 1/2?",
    time: "10:26",
  },
  {
    id: "cm5",
    sender: "volunteer",
    name: "Carlos Rivera",
    message: "Perfecto! Eso es correcto 🎉",
    time: "10:27",
  },
];

export const historialSesiones = [
  {
    id: "hs1",
    date: "28 Mar 2026",
    subject: "Matemáticas",
    volunteerName: "Carlos Rivera",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Carlos+Rivera&background=1351aa&color=fff&rounded=true&bold=true",
    duration: "45 min",
    rating: 5,
    topic: "Multiplicación de decimales",
  },
  {
    id: "hs2",
    date: "27 Mar 2026",
    subject: "Ciencias",
    volunteerName: "Ana Martínez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Ana+Martinez&background=4caf50&color=fff&rounded=true&bold=true",
    duration: "30 min",
    rating: 4,
    topic: "Los ecosistemas",
  },
  {
    id: "hs3",
    date: "26 Mar 2026",
    subject: "Programación",
    volunteerName: "Laura Gómez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Laura+Gomez&background=ff8c42&color=fff&rounded=true&bold=true",
    duration: "60 min",
    rating: 5,
    topic: "Mi primer juego en Scratch",
  },
  {
    id: "hs4",
    date: "25 Mar 2026",
    subject: "Lectoescritura",
    volunteerName: "Pedro Sánchez",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Pedro+Sanchez&background=7c4dff&color=fff&rounded=true&bold=true",
    duration: "35 min",
    rating: 4,
    topic: "Comprensión lectora",
  },
  {
    id: "hs5",
    date: "24 Mar 2026",
    subject: "Idiomas",
    volunteerName: "Miguel Torres",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Miguel+Torres&background=ffc107&color=fff&rounded=true&bold=true",
    duration: "40 min",
    rating: 5,
    topic: "Colors and numbers",
  },
  {
    id: "hs6",
    date: "23 Mar 2026",
    subject: "Matemáticas",
    volunteerName: "Carlos Rivera",
    volunteerAvatar: "https://ui-avatars.com/api/?name=Carlos+Rivera&background=1351aa&color=fff&rounded=true&bold=true",
    duration: "50 min",
    rating: 5,
    topic: "Fracciones básicas",
  },
];

export const subjects = [
  { value: "matematicas", label: "Matemáticas", color: "#1351aa" },
  { value: "ciencias", label: "Ciencias", color: "#4caf50" },
  { value: "idiomas", label: "Idiomas", color: "#7c4dff" },
  { value: "programacion", label: "Programación", color: "#ff8c42" },
  { value: "lectoescritura", label: "Lectoescritura", color: "#ff6b9d" },
] as const;

export function getSubjectColor(subject: string): string {
  const colorMap: Record<string, string> = {
    "Matemáticas": "#1351aa",
    "Ciencias": "#4caf50",
    "Idiomas": "#7c4dff",
    "Programación": "#ff8c42",
    "Lectoescritura": "#ff6b9d",
  };
  return colorMap[subject] || "#1351aa";
}

// ============================================================
// Panel CTC (Admin Dashboard) Data
// ============================================================

export const ctcMetrics = {
  sesionesActivas: 3,
  estudiantesConectados: 24,
  voluntariosDisponibles: 8,
  satisfaccion: 4.7,
};

export const activeSessions = [
  {
    id: "s1",
    title: "Álgebra Básica",
    subject: "Matemáticas",
    student: { name: "María Pérez", avatar: "https://ui-avatars.com/api/?name=Maria+Perez&background=ff6b9d&color=fff&rounded=true&bold=true" },
    volunteer: { name: "Carlos Méndez", avatar: "https://ui-avatars.com/api/?name=Carlos+Mendez&background=1351aa&color=fff&rounded=true&bold=true" },
    duration: "00:34:12",
    quality: "green" as const,
  },
  {
    id: "s2",
    title: "Lectura Comprensiva",
    subject: "Español",
    student: { name: "Juan Rosario", avatar: "https://ui-avatars.com/api/?name=Juan+Rosario&background=1351aa&color=fff&rounded=true&bold=true" },
    volunteer: { name: "Ana García", avatar: "https://ui-avatars.com/api/?name=Ana+Garcia&background=4caf50&color=fff&rounded=true&bold=true" },
    duration: "01:12:05",
    quality: "yellow" as const,
  },
  {
    id: "s3",
    title: "Introducción a Python",
    subject: "Programación",
    student: { name: "Luisa Fernández", avatar: "https://ui-avatars.com/api/?name=Luisa+Fernandez&background=ff6b9d&color=fff&rounded=true&bold=true" },
    volunteer: { name: "Pedro Ramírez", avatar: "https://ui-avatars.com/api/?name=Pedro+Ramirez&background=7c4dff&color=fff&rounded=true&bold=true" },
    duration: "00:15:48",
    quality: "green" as const,
  },
];

export const weeklyAttendance = [
  { day: "Lun", asistencia: 18 },
  { day: "Mar", asistencia: 22 },
  { day: "Mié", asistencia: 20 },
  { day: "Jue", asistencia: 26 },
  { day: "Vie", asistencia: 24 },
  { day: "Sáb", asistencia: 12 },
  { day: "Dom", asistencia: 5 },
];

export const hoursBySubject = [
  { subject: "Matemáticas", hours: 34, color: "#1351aa" },
  { subject: "Español", hours: 28, color: "#ff8c42" },
  { subject: "Ciencias", hours: 18, color: "#4caf50" },
  { subject: "Programación", hours: 22, color: "#7c4dff" },
  { subject: "Inglés", hours: 15, color: "#ff6b9d" },
];

export const subjectDistribution = [
  { name: "Matemáticas", value: 30, color: "#1351aa" },
  { name: "Español", value: 24, color: "#ff8c42" },
  { name: "Ciencias", value: 15, color: "#4caf50" },
  { name: "Programación", value: 19, color: "#7c4dff" },
  { name: "Inglés", value: 12, color: "#ff6b9d" },
];

export const studentAlerts = [
  {
    id: "a1",
    message: "María Pérez lleva 5 días sin actividad",
    severity: "high" as const,
    student: "María Pérez",
  },
  {
    id: "a2",
    message: "Juan Rosario no completó su sesión de ayer",
    severity: "medium" as const,
    student: "Juan Rosario",
  },
];

export type ScheduleBlock = "disponible" | "ocupado" | "cerrado";

export const scheduleData: Record<string, ScheduleBlock[]> = {
  Lun: [
    "disponible", "disponible", "ocupado", "ocupado",
    "disponible", "disponible", "ocupado", "disponible", "cerrado", "cerrado",
  ],
  Mar: [
    "ocupado", "disponible", "disponible", "ocupado",
    "disponible", "disponible", "disponible", "ocupado", "cerrado", "cerrado",
  ],
  Mié: [
    "disponible", "ocupado", "ocupado", "disponible",
    "disponible", "ocupado", "disponible", "disponible", "cerrado", "cerrado",
  ],
  Jue: [
    "ocupado", "ocupado", "disponible", "disponible",
    "ocupado", "disponible", "disponible", "disponible", "cerrado", "cerrado",
  ],
  Vie: [
    "disponible", "disponible", "disponible", "ocupado",
    "disponible", "disponible", "cerrado", "cerrado", "cerrado", "cerrado",
  ],
};

export const scheduleHours = [
  "8:00", "9:00", "10:00", "11:00", "12:00",
  "1:00", "2:00", "3:00", "4:00", "5:00",
];

// ============================================================
// Voluntarios (Verification & Management) Data
// ============================================================

export const onboardingSteps = [
  { id: 1, label: "Registro", description: "Creación de cuenta", status: "completed" as const },
  { id: 2, label: "Verificación de Identidad", description: "Documento oficial", status: "completed" as const },
  { id: 3, label: "Antecedentes Penales", description: "Verificación en curso", status: "in-progress" as const },
  { id: 4, label: "Capacitación", description: "Videos obligatorios", status: "pending" as const },
  { id: 5, label: "Aprobado", description: "Listo para tutorías", status: "pending" as const },
];

export const skillOptions = [
  "Matemáticas",
  "Física",
  "Programación Python",
  "Inglés",
  "Español",
  "Ciencias Naturales",
  "Historia",
  "Química",
];

export const trainingVideos = [
  {
    id: "v1",
    title: "Video introductorio sobre los CTC",
    duration: "15 min",
    completed: true,
    progress: 100,
  },
  {
    id: "v2",
    title: "Protocolo de interacción con menores",
    duration: "20 min",
    completed: true,
    progress: 100,
  },
  {
    id: "v3",
    title: "Guía de accesibilidad",
    duration: "10 min",
    completed: false,
    progress: 35,
  },
];

export const volunteerReviews = [
  {
    id: "r1",
    author: "María Pérez",
    role: "Estudiante",
    avatar: "https://ui-avatars.com/api/?name=Maria+Perez&background=ff6b9d&color=fff&rounded=true&bold=true",
    rating: 5,
    text: "Excelente tutor, explica muy bien los conceptos difíciles de matemáticas.",
    date: "2026-03-25",
  },
  {
    id: "r2",
    author: "Coordinador CTC La Vega",
    role: "Coordinador",
    avatar: "https://ui-avatars.com/api/?name=Coordinador+CTC&background=1351aa&color=fff&rounded=true&bold=true",
    rating: 5,
    text: "Muy puntual y comprometido con los estudiantes. Siempre prepara su material.",
    date: "2026-03-20",
  },
  {
    id: "r3",
    author: "Juan Rosario",
    role: "Estudiante",
    avatar: "https://ui-avatars.com/api/?name=Juan+Rosario&background=1351aa&color=fff&rounded=true&bold=true",
    rating: 4,
    text: "Me ayudó mucho con programación, aunque a veces va un poco rápido.",
    date: "2026-03-18",
  },
];

export const ratingBreakdown = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

// ============================================================
// Profesor Virtual IA Data
// ============================================================

export const studentProfile = {
  name: "María José Pérez",
  grade: "5to Grado",
  avatar: "MJ",
  subjects: [
    { name: "Matemáticas", level: 65, color: "#1351aa" },
    { name: "Ciencias", level: 45, color: "#4caf50" },
    { name: "Lectoescritura", level: 80, color: "#ff8c42" },
    { name: "Programación", level: 30, color: "#7c4dff" },
  ],
  interests: ["Robótica", "Dibujo", "Ciencias Naturales", "Música"],
  reinforcement: [
    "Fracciones y decimales",
    "Comprensión lectora inferencial",
    "Pensamiento lógico",
  ],
  queryHistory: [
    { id: "q1", text: "¿Cómo se suman fracciones?", date: "Hoy, 3:45 PM", subject: "Matemáticas" },
    { id: "q2", text: "¿Qué es la fotosíntesis?", date: "Ayer, 10:20 AM", subject: "Ciencias" },
    { id: "q3", text: "Ayuda con el cuento de Juan Bosch", date: "Lun, 2:15 PM", subject: "Lectoescritura" },
    { id: "q4", text: "¿Cómo hago un bucle en Scratch?", date: "Dom, 5:00 PM", subject: "Programación" },
    { id: "q5", text: "Multiplicación de dos cifras", date: "Sáb, 11:30 AM", subject: "Matemáticas" },
  ],
};

export type AiChatMessage = {
  id: string;
  role: "student" | "ai";
  content: string;
  timestamp: string;
};

export const aiChatMessages: AiChatMessage[] = [
  { id: "m1", role: "student", content: "No entendí las fracciones de la clase de hoy", timestamp: "3:40 PM" },
  { id: "m2", role: "ai", content: "¡No te preocupes! Las fracciones son como pedazos de pizza 🍕. Si tienes una pizza cortada en 4 pedazos y te comes 1, eso es 1/4. ¿Quieres que practiquemos?", timestamp: "3:40 PM" },
  { id: "m3", role: "student", content: "Sí, pero ¿cómo sumo 1/4 + 2/4?", timestamp: "3:42 PM" },
  { id: "m4", role: "ai", content: "¡Excelente pregunta! Cuando los denominadores son iguales, solo sumas los numeradores: 1+2=3, entonces 1/4 + 2/4 = 3/4 ¿Ves? ¡Ya tienes 3 de los 4 pedazos de pizza! 🍕", timestamp: "3:42 PM" },
  { id: "m5", role: "student", content: "¡Ahh ya entendí!", timestamp: "3:44 PM" },
  { id: "m6", role: "ai", content: "¡Muy bien! 🎉 Ahora intentemos un ejercicio para practicar lo que aprendiste...", timestamp: "3:44 PM" },
];

export const exerciseData = {
  title: "Suma de fracciones",
  question: "¿Cuánto es 2/5 + 1/5?",
  options: [
    { id: "a", label: "1/5" },
    { id: "b", label: "3/5" },
    { id: "c", label: "3/10" },
    { id: "d", label: "2/10" },
  ],
  correctAnswer: "b",
  currentExercise: 3,
  totalExercises: 5,
};

// ============================================================
// Biblioteca Data
// ============================================================

export type SubjectFilter = "Todas" | "Matemáticas" | "Ciencias" | "Idiomas" | "Programación" | "Lectoescritura";

export const subjectFilters: { label: SubjectFilter; color: string; bg: string }[] = [
  { label: "Todas", color: "#1351aa", bg: "#e3e2de" },
  { label: "Matemáticas", color: "#1351aa", bg: "#dbe6f6" },
  { label: "Ciencias", color: "#4caf50", bg: "#e8f5e9" },
  { label: "Idiomas", color: "#ff8c42", bg: "#fff3e0" },
  { label: "Programación", color: "#7c4dff", bg: "#ede7f6" },
  { label: "Lectoescritura", color: "#ff6b9d", bg: "#fce4ec" },
];

export type VideoCard = {
  id: string;
  title: string;
  subject: string;
  volunteer: string;
  date: string;
  duration: string;
  views: number;
  rating: number;
  tags: string[];
  hasTranscription: boolean;
  accessibility: string[];
  gradient: string;
};

export const featuredVideos: VideoCard[] = [
  {
    id: "v1",
    title: "Fracciones Divertidas: Suma y Resta",
    subject: "Matemáticas",
    volunteer: "Prof. Ana García",
    date: "25 Mar 2026",
    duration: "18 min",
    views: 1240,
    rating: 4.8,
    tags: ["Fracciones", "Aritmética", "5to Grado"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Subtítulos"],
    gradient: "from-[#1351aa] to-[#4a7fd4]",
  },
  {
    id: "v2",
    title: "El Ciclo del Agua Explicado",
    subject: "Ciencias",
    volunteer: "Prof. Carlos Mejía",
    date: "22 Mar 2026",
    duration: "24 min",
    views: 980,
    rating: 4.9,
    tags: ["Ciclo del agua", "Naturaleza", "4to Grado"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Lengua de Señas", "Subtítulos"],
    gradient: "from-[#4caf50] to-[#81c784]",
  },
  {
    id: "v3",
    title: "Inglés Básico: Saludos y Presentaciones",
    subject: "Idiomas",
    volunteer: "Prof. Lisa Johnson",
    date: "20 Mar 2026",
    duration: "15 min",
    views: 2100,
    rating: 4.7,
    tags: ["Inglés", "Vocabulario", "Principiante"],
    hasTranscription: true,
    accessibility: ["Subtítulos"],
    gradient: "from-[#ff8c42] to-[#ffb74d]",
  },
  {
    id: "v4",
    title: "Mi Primer Programa en Scratch",
    subject: "Programación",
    volunteer: "Prof. Diego Ramos",
    date: "18 Mar 2026",
    duration: "30 min",
    views: 1560,
    rating: 4.6,
    tags: ["Scratch", "Lógica", "Principiante"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Subtítulos"],
    gradient: "from-[#7c4dff] to-[#b388ff]",
  },
];

export const allVideos: VideoCard[] = [
  ...featuredVideos,
  {
    id: "bv5",
    title: "Cuentos Dominicanos para Niños",
    subject: "Lectoescritura",
    volunteer: "Prof. María Santos",
    date: "15 Mar 2026",
    duration: "20 min",
    views: 870,
    rating: 4.5,
    tags: ["Lectura", "Cuentos", "3er Grado"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Lengua de Señas", "Subtítulos"],
    gradient: "from-[#ff6b9d] to-[#ff80ab]",
  },
  {
    id: "bv6",
    title: "Geometría: Figuras y Ángulos",
    subject: "Matemáticas",
    volunteer: "Prof. Roberto Cruz",
    date: "12 Mar 2026",
    duration: "22 min",
    views: 640,
    rating: 4.3,
    tags: ["Geometría", "Ángulos", "6to Grado"],
    hasTranscription: true,
    accessibility: ["Subtítulos"],
    gradient: "from-[#1351aa] to-[#4a7fd4]",
  },
  {
    id: "bv7",
    title: "Los Ecosistemas Dominicanos",
    subject: "Ciencias",
    volunteer: "Prof. Laura Díaz",
    date: "10 Mar 2026",
    duration: "28 min",
    views: 520,
    rating: 4.4,
    tags: ["Ecosistemas", "Biodiversidad", "5to Grado"],
    hasTranscription: false,
    accessibility: ["Subtítulos"],
    gradient: "from-[#4caf50] to-[#81c784]",
  },
  {
    id: "bv8",
    title: "Verbos en Inglés: Presente Simple",
    subject: "Idiomas",
    volunteer: "Prof. Lisa Johnson",
    date: "8 Mar 2026",
    duration: "17 min",
    views: 1320,
    rating: 4.8,
    tags: ["Inglés", "Gramática", "Intermedio"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Subtítulos"],
    gradient: "from-[#ff8c42] to-[#ffb74d]",
  },
  {
    id: "bv9",
    title: "Programación con Python para Niños",
    subject: "Programación",
    volunteer: "Prof. Diego Ramos",
    date: "5 Mar 2026",
    duration: "35 min",
    views: 910,
    rating: 4.7,
    tags: ["Python", "Variables", "Intermedio"],
    hasTranscription: true,
    accessibility: ["Subtítulos"],
    gradient: "from-[#7c4dff] to-[#b388ff]",
  },
  {
    id: "bv10",
    title: "Comprensión Lectora: Estrategias",
    subject: "Lectoescritura",
    volunteer: "Prof. María Santos",
    date: "3 Mar 2026",
    duration: "19 min",
    views: 740,
    rating: 4.6,
    tags: ["Comprensión", "Estrategias", "4to Grado"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Lengua de Señas", "Subtítulos"],
    gradient: "from-[#ff6b9d] to-[#ff80ab]",
  },
  {
    id: "bv11",
    title: "Tablas de Multiplicar con Juegos",
    subject: "Matemáticas",
    volunteer: "Prof. Ana García",
    date: "1 Mar 2026",
    duration: "25 min",
    views: 1890,
    rating: 4.9,
    tags: ["Multiplicación", "Juegos", "3er Grado"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Subtítulos"],
    gradient: "from-[#1351aa] to-[#4a7fd4]",
  },
  {
    id: "bv12",
    title: "El Sistema Solar Interactivo",
    subject: "Ciencias",
    volunteer: "Prof. Carlos Mejía",
    date: "28 Feb 2026",
    duration: "32 min",
    views: 1100,
    rating: 4.8,
    tags: ["Sistema Solar", "Astronomía", "6to Grado"],
    hasTranscription: true,
    accessibility: ["Audio Descripción", "Lengua de Señas", "Subtítulos"],
    gradient: "from-[#4caf50] to-[#81c784]",
  },
];

export type Playlist = {
  id: string;
  title: string;
  description: string;
  sessionCount: number;
  totalDuration: string;
  gradient: string;
};

export const playlists: Playlist[] = [
  {
    id: "pl1",
    title: "Preparación PISA",
    description: "Ejercicios y clases para la evaluación internacional",
    sessionCount: 12,
    totalDuration: "4h 30min",
    gradient: "from-[#1351aa] via-[#7c4dff] to-[#4a7fd4]",
  },
  {
    id: "pl2",
    title: "Refuerzo Matemáticas",
    description: "Repaso de fundamentos matemáticos esenciales",
    sessionCount: 8,
    totalDuration: "3h 15min",
    gradient: "from-[#ff8c42] via-[#ffc107] to-[#ff6b9d]",
  },
  {
    id: "pl3",
    title: "Inglés desde Cero",
    description: "Curso completo de inglés para principiantes",
    sessionCount: 15,
    totalDuration: "5h 45min",
    gradient: "from-[#4caf50] via-[#81c784] to-[#ffc107]",
  },
  {
    id: "pl4",
    title: "Lectura Comprensiva",
    description: "Mejora tu comprensión lectora paso a paso",
    sessionCount: 10,
    totalDuration: "3h 50min",
    gradient: "from-[#ff6b9d] via-[#ff80ab] to-[#7c4dff]",
  },
];

export const transcriptLines = [
  { time: "0:00", text: "Hoy vamos a aprender sobre fracciones.", active: false },
  { time: "0:15", text: "Una fracción representa una parte de un todo.", active: false },
  { time: "0:32", text: "Por ejemplo, si cortamos una pizza en cuatro partes iguales...", active: false },
  { time: "0:48", text: "...cada parte es un cuarto, o sea, un cuarto se escribe como 1/4.", active: false },
  { time: "1:05", text: "El número de arriba se llama numerador.", active: false },
  { time: "1:18", text: "El número de abajo se llama denominador.", active: true },
  { time: "1:30", text: "El denominador nos dice en cuántas partes dividimos el todo.", active: false },
  { time: "1:45", text: "Y el numerador nos dice cuántas partes tomamos.", active: false },
  { time: "2:00", text: "Ahora practiquemos con algunos ejemplos divertidos.", active: false },
];

export const volunteerDirectory = [
  {
    id: "vol1",
    name: "Carlos Méndez",
    country: "México",
    avatar: "https://ui-avatars.com/api/?name=Carlos+Mendez&background=1351aa&color=fff&rounded=true&bold=true",
    rating: 4.9,
    specialties: ["Matemáticas", "Física"],
    status: "Verificado" as const,
    sessionsCompleted: 47,
  },
  {
    id: "vol2",
    name: "Ana García",
    country: "Colombia",
    avatar: "https://ui-avatars.com/api/?name=Ana+Garcia&background=4caf50&color=fff&rounded=true&bold=true",
    rating: 4.8,
    specialties: ["Español", "Historia"],
    status: "Verificado" as const,
    sessionsCompleted: 32,
  },
  {
    id: "vol3",
    name: "Pedro Ramírez",
    country: "República Dominicana",
    avatar: "https://ui-avatars.com/api/?name=Pedro+Ramirez&background=7c4dff&color=fff&rounded=true&bold=true",
    rating: 4.6,
    specialties: ["Programación Python", "Inglés"],
    status: "En Proceso" as const,
    sessionsCompleted: 12,
  },
  {
    id: "vol4",
    name: "Lucía Torres",
    country: "Argentina",
    avatar: "https://ui-avatars.com/api/?name=Lucia+Torres&background=ff6b9d&color=fff&rounded=true&bold=true",
    rating: 3.2,
    specialties: ["Ciencias Naturales"],
    status: "Suspendido" as const,
    sessionsCompleted: 5,
  },
  {
    id: "vol5",
    name: "Roberto Díaz",
    country: "España",
    avatar: "https://ui-avatars.com/api/?name=Roberto+Diaz&background=1351aa&color=fff&rounded=true&bold=true",
    rating: 4.7,
    specialties: ["Matemáticas", "Química"],
    status: "Verificado" as const,
    sessionsCompleted: 28,
  },
  {
    id: "vol6",
    name: "Sofía Martínez",
    country: "Chile",
    avatar: "https://ui-avatars.com/api/?name=Sofia+Martinez&background=ff6b9d&color=fff&rounded=true&bold=true",
    rating: 4.5,
    specialties: ["Inglés", "Español"],
    status: "En Proceso" as const,
    sessionsCompleted: 8,
  },
];

// ============================================================
// Agenda Colaborativa Data
// ============================================================

export interface AgendaCourse {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  progress: number;
  totalSessions: number;
  completedSessions: number;
}

export interface AgendaVolunteer {
  id: string;
  name: string;
  avatar: string;
}

export interface AgendaSession {
  id: string;
  courseId: string;
  topic: string;
  description: string;
  day: string;
  dayIndex: number;
  startHour: number;
  endHour: number;
  color: string;
  volunteer: AgendaVolunteer | null;
  materials: string[];
  previousSummary: string;
  attendeeCount: number;
  hasAIFallback: boolean;
}

export const agendaCourses: AgendaCourse[] = [
  {
    id: "python",
    name: "Python Basico",
    icon: "Code",
    color: "#1351aa",
    gradient: "from-[#1351aa] to-[#7c4dff]",
    progress: 65,
    totalSessions: 24,
    completedSessions: 16,
  },
  {
    id: "math",
    name: "Matematicas 3er Grado",
    icon: "Calculator",
    color: "#ff8c42",
    gradient: "from-[#ff8c42] to-[#ffc107]",
    progress: 42,
    totalSessions: 30,
    completedSessions: 13,
  },
  {
    id: "science",
    name: "Ciencias Naturales",
    icon: "Microscope",
    color: "#4caf50",
    gradient: "from-[#4caf50] to-[#81c784]",
    progress: 78,
    totalSessions: 20,
    completedSessions: 16,
  },
  {
    id: "english",
    name: "Ingles Basico",
    icon: "Globe",
    color: "#7c4dff",
    gradient: "from-[#7c4dff] to-[#ff6b9d]",
    progress: 55,
    totalSessions: 28,
    completedSessions: 15,
  },
  {
    id: "reading",
    name: "Lectoescritura",
    icon: "BookOpen",
    color: "#ff6b9d",
    gradient: "from-[#ff6b9d] to-[#ffc107]",
    progress: 88,
    totalSessions: 18,
    completedSessions: 16,
  },
];

export const agendaSessions: AgendaSession[] = [
  {
    id: "as1",
    courseId: "math",
    topic: "Fracciones equivalentes",
    description: "Aprenderemos a identificar y crear fracciones equivalentes usando modelos visuales y manipulativos.",
    day: "Lunes",
    dayIndex: 0,
    startHour: 9,
    endHour: 10,
    color: "#ff8c42",
    volunteer: { id: "v1", name: "Maria Garcia", avatar: "MG" },
    materials: ["Guia de fracciones PDF", "Manipulativos virtuales", "Ejercicios interactivos"],
    previousSummary: "En la sesion anterior se trabajo con fracciones basicas 1/2, 1/3, 1/4. Los estudiantes mostraron buena comprension.",
    attendeeCount: 12,
    hasAIFallback: true,
  },
  {
    id: "as2",
    courseId: "python",
    topic: "Variables y tipos de datos",
    description: "Introduccion a variables en Python: int, float, string, boolean.",
    day: "Lunes",
    dayIndex: 0,
    startHour: 11,
    endHour: 12,
    color: "#1351aa",
    volunteer: { id: "v2", name: "Carlos Rodriguez", avatar: "CR" },
    materials: ["Notebook de Jupyter", "Ejercicios de practica", "Video introductorio"],
    previousSummary: "Se cubrio la instalacion de Python y el uso basico de la terminal. Todos los estudiantes tienen el entorno listo.",
    attendeeCount: 8,
    hasAIFallback: true,
  },
  {
    id: "as3",
    courseId: "science",
    topic: "El ciclo del agua",
    description: "Exploracion del ciclo del agua: evaporacion, condensacion, precipitacion y recoleccion.",
    day: "Martes",
    dayIndex: 1,
    startHour: 10,
    endHour: 11,
    color: "#4caf50",
    volunteer: { id: "v3", name: "Ana Martinez", avatar: "AM" },
    materials: ["Diagrama interactivo", "Experimento casero: mini ciclo del agua", "Quiz de repaso"],
    previousSummary: "Se reviso la composicion del agua y los estados de la materia.",
    attendeeCount: 15,
    hasAIFallback: false,
  },
  {
    id: "as4",
    courseId: "english",
    topic: "Greetings and introductions",
    description: "Practica de saludos basicos en ingles, presentaciones personales y vocabulario esencial.",
    day: "Martes",
    dayIndex: 1,
    startHour: 14,
    endHour: 15,
    color: "#7c4dff",
    volunteer: { id: "v4", name: "Luis Hernandez", avatar: "LH" },
    materials: ["Flashcards de vocabulario", "Audio de pronunciacion", "Role-play guia"],
    previousSummary: "Se introdujo el alfabeto en ingles y los sonidos basicos.",
    attendeeCount: 10,
    hasAIFallback: true,
  },
  {
    id: "as5",
    courseId: "reading",
    topic: "Comprension lectora: cuentos",
    description: "Lectura compartida de un cuento corto con actividades de comprension y vocabulario.",
    day: "Miercoles",
    dayIndex: 2,
    startHour: 9,
    endHour: 10,
    color: "#ff6b9d",
    volunteer: { id: "v5", name: "Sofia Lopez", avatar: "SL" },
    materials: ["Cuento: El pajaro azul", "Hoja de actividades", "Tarjetas de vocabulario"],
    previousSummary: "Se leyo 'La tortuga sabia' y se trabajo con preguntas de comprension.",
    attendeeCount: 14,
    hasAIFallback: false,
  },
  {
    id: "as6",
    courseId: "math",
    topic: "Suma de fracciones",
    description: "Aprender a sumar fracciones con el mismo denominador y con denominadores diferentes.",
    day: "Miercoles",
    dayIndex: 2,
    startHour: 11,
    endHour: 12,
    color: "#ff8c42",
    volunteer: null,
    materials: ["Guia de suma de fracciones", "Calculadora de fracciones online", "Ejercicios graduados"],
    previousSummary: "Se trabajo con fracciones equivalentes. Los estudiantes muestran comprension solida.",
    attendeeCount: 12,
    hasAIFallback: true,
  },
  {
    id: "as7",
    courseId: "python",
    topic: "Condicionales if/else",
    description: "Estructuras de control: if, elif, else. Toma de decisiones en programas.",
    day: "Jueves",
    dayIndex: 3,
    startHour: 11,
    endHour: 12,
    color: "#1351aa",
    volunteer: null,
    materials: ["Notebook de practica", "Mini proyecto: calculadora", "Diagrama de flujo"],
    previousSummary: "Se cubrio variables y tipos de datos. Los estudiantes completaron ejercicios de asignacion.",
    attendeeCount: 8,
    hasAIFallback: true,
  },
  {
    id: "as8",
    courseId: "science",
    topic: "Ecosistemas terrestres",
    description: "Clasificacion de ecosistemas terrestres: bosques, desiertos, praderas, tundra.",
    day: "Jueves",
    dayIndex: 3,
    startHour: 14,
    endHour: 15,
    color: "#4caf50",
    volunteer: { id: "v3", name: "Ana Martinez", avatar: "AM" },
    materials: ["Presentacion interactiva", "Video documental corto", "Mapa de ecosistemas"],
    previousSummary: "Se estudio el ciclo del agua con un experimento casero. Excelente participacion.",
    attendeeCount: 15,
    hasAIFallback: false,
  },
  {
    id: "as9",
    courseId: "english",
    topic: "Numbers and colors",
    description: "Vocabulario de numeros del 1 al 100 y colores basicos en ingles.",
    day: "Viernes",
    dayIndex: 4,
    startHour: 10,
    endHour: 11,
    color: "#7c4dff",
    volunteer: { id: "v4", name: "Luis Hernandez", avatar: "LH" },
    materials: ["Juego de memoria de numeros", "Cancion de los colores", "Worksheet de practica"],
    previousSummary: "Se practicaron saludos y presentaciones con role-play en parejas.",
    attendeeCount: 10,
    hasAIFallback: true,
  },
  {
    id: "as10",
    courseId: "reading",
    topic: "Escritura creativa: mi animal favorito",
    description: "Los estudiantes escribiran un parrafo descriptivo sobre su animal favorito.",
    day: "Viernes",
    dayIndex: 4,
    startHour: 12,
    endHour: 13,
    color: "#ff6b9d",
    volunteer: { id: "v5", name: "Sofia Lopez", avatar: "SL" },
    materials: ["Plantilla de escritura", "Banco de adjetivos", "Ejemplos de parrafos"],
    previousSummary: "Se trabajo comprension lectora con el cuento 'El pajaro azul'.",
    attendeeCount: 14,
    hasAIFallback: false,
  },
];

export const agendaAlerts = [
  {
    id: "aa1",
    sessionId: "as6",
    message: "La sesion de Suma de fracciones del Miercoles no tiene voluntario asignado",
    severity: "warning" as const,
    hoursUntil: 36,
  },
  {
    id: "aa2",
    sessionId: "as7",
    message: "La sesion de Condicionales if/else del Jueves no tiene voluntario asignado",
    severity: "warning" as const,
    hoursUntil: 48,
  },
];

export const agendaWeekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
export const agendaTimeSlots = Array.from({ length: 11 }, (_, i) => i + 8);

// ============================================================
// Matching Inteligente Data
// ============================================================

export interface MatchVolunteer {
  id: string;
  name: string;
  avatar: string;
  country: string;
  flag: string;
  skills: string[];
  rating: number;
  languages: string[];
  timezone: string;
  timezoneOffset: number;
  availability: { day: string; hours: number[] }[];
  matchCount: number;
  responseTime: string;
}

export interface MatchStudent {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  needs: string[];
  waitTime: string;
  waitMinutes: number;
  subject: string;
  hasAccessibilityNeeds: boolean;
  accessibilityNote?: string;
}

export interface MatchResultData {
  volunteer: MatchVolunteer;
  compatibility: number;
  reasons: string[];
  skillMatch: number;
  timezoneMatch: number;
  languageMatch: number;
  availabilityOverlap: number[];
}

export const matchVolunteers: MatchVolunteer[] = [
  {
    id: "mv1",
    name: "Maria Garcia",
    avatar: "MG",
    country: "Mexico",
    flag: "\ud83c\uddf2\ud83c\uddfd",
    skills: ["Matematicas", "Algebra", "Geometria"],
    rating: 4.9,
    languages: ["Espanol", "Ingles"],
    timezone: "CST (UTC-6)",
    timezoneOffset: -6,
    availability: [
      { day: "Lunes", hours: [9, 10, 11, 14, 15] },
      { day: "Miercoles", hours: [9, 10, 11, 14, 15] },
      { day: "Viernes", hours: [10, 11, 12] },
    ],
    matchCount: 47,
    responseTime: "15 min",
  },
  {
    id: "mv2",
    name: "Carlos Rodriguez",
    avatar: "CR",
    country: "Colombia",
    flag: "\ud83c\udde8\ud83c\uddf4",
    skills: ["Python", "JavaScript", "Programacion"],
    rating: 4.7,
    languages: ["Espanol", "Portugues"],
    timezone: "COT (UTC-5)",
    timezoneOffset: -5,
    availability: [
      { day: "Lunes", hours: [8, 9, 10, 11] },
      { day: "Martes", hours: [8, 9, 10, 11, 14, 15, 16] },
      { day: "Jueves", hours: [8, 9, 10, 11] },
    ],
    matchCount: 32,
    responseTime: "8 min",
  },
  {
    id: "mv3",
    name: "Ana Martinez",
    avatar: "AM",
    country: "Espana",
    flag: "\ud83c\uddea\ud83c\uddf8",
    skills: ["Ciencias", "Biologia", "Quimica"],
    rating: 4.8,
    languages: ["Espanol", "Frances", "Ingles"],
    timezone: "CET (UTC+1)",
    timezoneOffset: 1,
    availability: [
      { day: "Martes", hours: [15, 16, 17] },
      { day: "Miercoles", hours: [15, 16, 17] },
      { day: "Viernes", hours: [10, 11, 12, 15, 16] },
    ],
    matchCount: 28,
    responseTime: "20 min",
  },
  {
    id: "mv4",
    name: "Luis Hernandez",
    avatar: "LH",
    country: "Argentina",
    flag: "\ud83c\udde6\ud83c\uddf7",
    skills: ["Ingles", "Gramatica", "Conversacion"],
    rating: 4.6,
    languages: ["Espanol", "Ingles"],
    timezone: "ART (UTC-3)",
    timezoneOffset: -3,
    availability: [
      { day: "Lunes", hours: [10, 11, 12, 13] },
      { day: "Martes", hours: [10, 11, 12, 13] },
      { day: "Jueves", hours: [10, 11, 12, 13, 14, 15] },
    ],
    matchCount: 19,
    responseTime: "12 min",
  },
  {
    id: "mv5",
    name: "Sofia Lopez",
    avatar: "SL",
    country: "Peru",
    flag: "\ud83c\uddf5\ud83c\uddea",
    skills: ["Lectura", "Escritura", "Literatura"],
    rating: 4.9,
    languages: ["Espanol"],
    timezone: "PET (UTC-5)",
    timezoneOffset: -5,
    availability: [
      { day: "Lunes", hours: [8, 9, 10] },
      { day: "Miercoles", hours: [8, 9, 10, 14, 15, 16] },
      { day: "Viernes", hours: [8, 9, 10, 14, 15] },
    ],
    matchCount: 53,
    responseTime: "5 min",
  },
];

export const matchStudentsWaiting: MatchStudent[] = [
  {
    id: "mst1",
    name: "Diego Ramirez",
    avatar: "DR",
    grade: "3er Grado",
    needs: ["Matematicas", "Apoyo personalizado"],
    waitTime: "3 dias",
    waitMinutes: 4320,
    subject: "Matematicas",
    hasAccessibilityNeeds: true,
    accessibilityNote: "Requiere texto grande y alto contraste",
  },
  {
    id: "mst2",
    name: "Valentina Torres",
    avatar: "VT",
    grade: "4to Grado",
    needs: ["Ciencias Naturales"],
    waitTime: "2 dias",
    waitMinutes: 2880,
    subject: "Ciencias",
    hasAccessibilityNeeds: false,
  },
  {
    id: "mst3",
    name: "Mateo Flores",
    avatar: "MF",
    grade: "5to Grado",
    needs: ["Python", "Logica de programacion"],
    waitTime: "1 dia",
    waitMinutes: 1440,
    subject: "Programacion",
    hasAccessibilityNeeds: false,
  },
  {
    id: "mst4",
    name: "Camila Ruiz",
    avatar: "CRz",
    grade: "2do Grado",
    needs: ["Lectura", "Escritura"],
    waitTime: "4 dias",
    waitMinutes: 5760,
    subject: "Lectoescritura",
    hasAccessibilityNeeds: true,
    accessibilityNote: "Dislexia leve - requiere materiales adaptados",
  },
  {
    id: "mst5",
    name: "Sebastian Morales",
    avatar: "SM",
    grade: "3er Grado",
    needs: ["Ingles basico"],
    waitTime: "12 horas",
    waitMinutes: 720,
    subject: "Ingles",
    hasAccessibilityNeeds: false,
  },
];

export const matchResultsData: MatchResultData[] = [
  {
    volunteer: matchVolunteers[0],
    compatibility: 95,
    reasons: ["Experta en matematicas", "Zona horaria compatible", "Habla espanol nativo", "Alta calificacion (4.9)"],
    skillMatch: 98,
    timezoneMatch: 90,
    languageMatch: 100,
    availabilityOverlap: [9, 10, 11, 14, 15],
  },
  {
    volunteer: matchVolunteers[1],
    compatibility: 87,
    reasons: ["Especialista en Python", "Respuesta rapida (8 min)", "Experiencia con principiantes"],
    skillMatch: 95,
    timezoneMatch: 85,
    languageMatch: 90,
    availabilityOverlap: [8, 9, 10, 11],
  },
  {
    volunteer: matchVolunteers[2],
    compatibility: 72,
    reasons: ["Experta en ciencias", "Habla tres idiomas", "Metodologia interactiva"],
    skillMatch: 90,
    timezoneMatch: 55,
    languageMatch: 100,
    availabilityOverlap: [15, 16, 17],
  },
  {
    volunteer: matchVolunteers[3],
    compatibility: 68,
    reasons: ["Nativo en ingles conversacional", "Buena disponibilidad", "Metodologia ludica"],
    skillMatch: 85,
    timezoneMatch: 60,
    languageMatch: 95,
    availabilityOverlap: [10, 11, 12, 13],
  },
  {
    volunteer: matchVolunteers[4],
    compatibility: 91,
    reasons: ["Especialista en lectoescritura", "Tiempo de respuesta excepcional", "53 clases completadas"],
    skillMatch: 96,
    timezoneMatch: 88,
    languageMatch: 100,
    availabilityOverlap: [8, 9, 10, 14, 15, 16],
  },
];

export const matchingStatsData = {
  totalMatchesThisWeek: 23,
  averageCompatibility: 82,
  averageResponseTime: "12 min",
  totalVolunteers: 156,
  totalStudents: 342,
  activeSessionsToday: 8,
};
