import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, LayoutDashboard, LogOut, MessageSquare, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Yhteenveto", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/visitors", label: "Kävijät", icon: Users },
  { to: "/dashboard/conversations", label: "Keskustelut", icon: MessageSquare },
  { to: "/dashboard/reservations", label: "Varaukset", icon: CalendarDays },
] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "/dashboard/login";
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
            <h1 className="text-lg font-medium">Restadigi Dashboard</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => void logout()}>
            <LogOut className="size-4" />
            Kirjaudu ulos
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-sm px-3 py-2 text-sm whitespace-nowrap transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}
