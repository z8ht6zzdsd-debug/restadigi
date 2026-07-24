import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/dashboard/login")({
  head: () => ({
    meta: [
      { title: "Restadigi Admin — Kirjaudu" },
      {
        name: "description",
        content: "Restadigi hallintapaneelin kirjautuminen.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardLoginPage,
});

function DashboardLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetch("/api/auth/me", { credentials: "include" }).then((res) => {
      if (res.ok) void navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Kirjautuminen epäonnistui");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Virhe");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2a2018] px-4">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="w-full max-w-sm space-y-6 rounded-2xl border border-white/15 bg-[#432f24] p-8 text-white shadow-2xl"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8a05a]">
            Restadigi Admin
          </p>
          <h1 className="mt-2 font-serif text-2xl tracking-tight">Kirjaudu hallintaan</h1>
          <p className="mt-2 text-sm text-white/70">Vain sisäiseen käyttöön · admin.restadigi.fi</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/85">
              Sähköposti
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-white/20 bg-white text-[#1a1512]"
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/85">
              Salasana
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-white/20 bg-white text-[#1a1512]"
              autoComplete="current-password"
            />
          </div>
        </div>

        {error && <p className="text-sm text-[#f0b090]">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-[#c46a32] text-white hover:bg-[#b35d29]"
          disabled={loading}
        >
          {loading ? "Kirjaudutaan…" : "Kirjaudu"}
        </Button>
      </form>
    </div>
  );
}
