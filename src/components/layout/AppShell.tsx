"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Users,
  Sparkles,
  Bot,
  Library,
  BarChart3,
  ShieldCheck,
  Accessibility,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Calendar,
  Video,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { currentStudent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, color: "#1351aa" },
  { href: "/tutorias", label: "Tutorías", icon: Video, color: "#ff8c42" },
  { href: "/agenda", label: "Agenda", icon: Calendar, color: "#4caf50" },
  { href: "/matching", label: "Matching", icon: Sparkles, color: "#7c4dff" },
  { href: "/profesor-ia", label: "Profesor IA", icon: Bot, color: "#ff6b9d" },
  { href: "/biblioteca", label: "Biblioteca", icon: BookOpen, color: "#ffc107" },
  { href: "/panel-ctc", label: "Panel CTC", icon: BarChart3, color: "#1351aa" },
  { href: "/voluntarios", label: "Voluntarios", icon: ShieldCheck, color: "#4caf50" },
  { href: "/accesibilidad", label: "Accesibilidad", icon: Accessibility, color: "#7c4dff" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#e3e2de]/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b px-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#1351aa] text-lg font-bold text-white">
            E
          </div>
          <span
            className="text-xl font-bold tracking-tight text-[#1351aa]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            EnlaceTEC
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#1351aa]/10 text-[#1351aa]"
                    : "text-gray-600 hover:bg-[#e3e2de]/50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className="size-5"
                  style={{ color: isActive ? item.color : undefined }}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-xl bg-[#e3e2de]/40 p-3">
            <Avatar size="lg">
              <AvatarImage src={currentStudent.avatar} />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {currentStudent.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {currentStudent.ctc}
              </p>
            </div>
            <Link href="/settings">
              <Settings className="size-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-md lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar cursos, voluntarios..."
                className="h-9 w-full rounded-xl border bg-[#e3e2de]/30 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#1351aa]/30 focus:ring-2 focus:ring-[#1351aa]/10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute right-1 top-1 size-2 rounded-full bg-[#ff8c42]" />
            </Button>
            <Avatar className="lg:hidden">
              <AvatarImage src={currentStudent.avatar} />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
