import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLogin = pathname === "/dashboard/login";
  const [ready, setReady] = useState(isLogin);

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }

    setReady(false);
    void fetch("/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          void navigate({ to: "/dashboard/login" });
          return;
        }
        setReady(true);
      })
      .catch(() => void navigate({ to: "/dashboard/login" }));
  }, [navigate, isLogin]);

  if (isLogin) {
    return <Outlet />;
  }

  if (!ready) {
    return (
      <div className="dashboard-app flex min-h-screen items-center justify-center text-[#5c534c]">
        Ladataan…
      </div>
    );
  }

  return (
    <DashboardShell>
      <Outlet />
      <Toaster position="top-center" richColors closeButton />
    </DashboardShell>
  );
}
