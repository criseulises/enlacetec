import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type AccessibilitySettings,
  type Notification,
  defaultAccessibilitySettings,
  students,
  volunteers,
  notifications as mockNotifications,
} from "./mock-data";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export type UserRole = "estudiante" | "voluntario" | "coordinador";

export interface CurrentUser {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
}

export interface AppState {
  // User
  currentUser: CurrentUser;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  toggleRole: () => void;

  // Accessibility
  accessibilitySettings: AccessibilitySettings;
  setAccessibilitySetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetAccessibilitySettings: () => void;

  // Layout
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadCount: () => number;
}

// -----------------------------------------------------------------------------
// Role-based default users
// -----------------------------------------------------------------------------
const roleUsers: Record<UserRole, CurrentUser> = {
  estudiante: {
    id: students[0].id,
    name: students[0].name,
    avatar: students[0].avatar,
    role: "estudiante",
  },
  voluntario: {
    id: volunteers[0].id,
    name: volunteers[0].name,
    avatar: volunteers[0].photo,
    role: "voluntario",
  },
  coordinador: {
    id: "coord-001",
    name: "Juana Mercedes Almánzar",
    avatar:
      "https://ui-avatars.com/api/?name=Juana+A&background=1351aa&color=fff&rounded=true&bold=true",
    role: "coordinador",
  },
};

const roleOrder: UserRole[] = ["estudiante", "voluntario", "coordinador"];

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------
// Convenience hook for accessibility pages that destructure settings directly
export function useAccessibility() {
  const settings = useAppStore((s) => s.accessibilitySettings);
  const setSetting = useAppStore((s) => s.setAccessibilitySetting);
  return {
    ...settings,
    setFontSize: (v: number) => setSetting("fontSize", v),
    setFontFamily: (v: AccessibilitySettings["fontFamily"]) => setSetting("fontFamily", v),
    setAudioSpeed: (v: number) => setSetting("audioSpeed", v),
    setContrastTheme: (v: AccessibilitySettings["contrastTheme"]) => setSetting("contrastTheme", v),
    setSignLanguageEnabled: (v: boolean) => setSetting("signLanguageEnabled", v),
    setHighlightedReadingEnabled: (v: boolean) => setSetting("highlightedReadingEnabled", v),
    setAudioDescriptionEnabled: (v: boolean) => setSetting("audioDescriptionEnabled", v),
    setHighContrast: (v: boolean) => setSetting("highContrast", v),
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User -------------------------------------------------------------------
      currentUser: roleUsers.estudiante,
      currentRole: "estudiante",

      setCurrentRole: (role) =>
        set({
          currentRole: role,
          currentUser: roleUsers[role],
        }),

      toggleRole: () => {
        const current = get().currentRole;
        const idx = roleOrder.indexOf(current);
        const next = roleOrder[(idx + 1) % roleOrder.length];
        set({
          currentRole: next,
          currentUser: roleUsers[next],
        });
      },

      // Accessibility ----------------------------------------------------------
      accessibilitySettings: { ...defaultAccessibilitySettings },

      setAccessibilitySetting: (key, value) =>
        set((state) => ({
          accessibilitySettings: {
            ...state.accessibilitySettings,
            [key]: value,
          },
        })),

      resetAccessibilitySettings: () =>
        set({ accessibilitySettings: { ...defaultAccessibilitySettings } }),

      // Layout -----------------------------------------------------------------
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Navigation -------------------------------------------------------------
      activeSection: "dashboard",
      setActiveSection: (section) => set({ activeSection: section }),

      // Notifications ----------------------------------------------------------
      notifications: [...mockNotifications],

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      unreadCount: () => get().notifications.filter((n) => !n.read).length,
    }),
    {
      name: "enlacetec-store",
      partialize: (state) => ({
        currentRole: state.currentRole,
        accessibilitySettings: state.accessibilitySettings,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
