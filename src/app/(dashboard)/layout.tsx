import { AppShell } from "@/components/layout/AppShell";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      {children}
      <AccessibilityToolbar />
    </AppShell>
  );
}
