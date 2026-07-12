import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { RestaurantSettings } from "@/lib/restaurant-settings-types";

export const Route = createFileRoute("/dashboard/settings")({
  component: DashboardSettingsPage,
});

type SettingsForm = Omit<RestaurantSettings, "id" | "updatedAt">;

function DashboardSettingsPage() {
  const [form, setForm] = useState<SettingsForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/dashboard/settings", { credentials: "include" })
      .then(async (res) => {
        const data = (await res.json()) as { settings?: RestaurantSettings; error?: string };
        if (!res.ok) throw new Error(data.error ?? "Asetusten lataus epäonnistui");
        const { id: _id, updatedAt: _updatedAt, ...rest } = data.settings!;
        setForm(rest);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function updateField<K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Tallennus epäonnistui");
      setMessage("Asetukset tallennettu.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tallennus epäonnistui");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Ladataan asetuksia…</p>;
  }

  if (error && !form) {
    return <p className="text-destructive">{error}</p>;
  }

  if (!form) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium">Ravintolan asetukset</h2>
        <p className="text-sm text-muted-foreground">
          Määritä chatbot, varaukset ja teema. Muutokset näkyvät sivustolla heti.
        </p>
      </div>

      {message && <p className="text-sm text-accent">{message}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <h3 className="font-medium">Perustiedot</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="restaurantName">Ravintolan nimi</Label>
            <Input
              id="restaurantName"
              value={form.restaurantName}
              onChange={(e) => updateField("restaurantName", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="chatbotWelcomeMessage">Chatbotin tervehdys</Label>
            <Textarea
              id="chatbotWelcomeMessage"
              rows={3}
              value={form.chatbotWelcomeMessage}
              onChange={(e) => updateField("chatbotWelcomeMessage", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="chatbotInstructions">Lisäohjeet chatbotille (valinnainen)</Label>
            <Textarea
              id="chatbotInstructions"
              rows={4}
              placeholder="Esim. erikoisruokavaliot, parkkipaikka, lasten tuolit…"
              value={form.chatbotInstructions ?? ""}
              onChange={(e) => updateField("chatbotInstructions", e.target.value || null)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <h3 className="font-medium">Teema</h3>
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="accentColor">Korostusväri (chatbot)</Label>
            <div className="flex items-center gap-3">
              <Input
                id="accentColor"
                type="color"
                className="h-10 w-16 cursor-pointer p-1"
                value={form.accentColor}
                onChange={(e) => updateField("accentColor", e.target.value)}
              />
              <Input
                value={form.accentColor}
                onChange={(e) => updateField("accentColor", e.target.value)}
                className="w-28 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium">Pöytävaraukset</h3>
            <p className="text-sm text-muted-foreground">
              Chatbot kerää varaukset ja ne näkyvät Varaukset-sivulla.
            </p>
          </div>
          <Switch
            checked={form.reservationsEnabled}
            onCheckedChange={(v) => updateField("reservationsEnabled", v)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="minPartySize">Min. henkilömäärä</Label>
            <Input
              id="minPartySize"
              type="number"
              min={1}
              value={form.minPartySize}
              onChange={(e) => updateField("minPartySize", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPartySize">Max. henkilömäärä</Label>
            <Input
              id="maxPartySize"
              type="number"
              min={1}
              value={form.maxPartySize}
              onChange={(e) => updateField("maxPartySize", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openTime">Aukiolo alkaa</Label>
            <Input
              id="openTime"
              type="time"
              value={form.openTime}
              onChange={(e) => updateField("openTime", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="closeTime">Aukiolo päättyy</Label>
            <Input
              id="closeTime"
              type="time"
              value={form.closeTime}
              onChange={(e) => updateField("closeTime", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <div className="flex items-center gap-3">
            <Switch
              checked={form.requireEmail}
              onCheckedChange={(v) => updateField("requireEmail", v)}
            />
            <Label>Sähköposti pakollinen</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={form.requirePhone}
              onCheckedChange={(v) => updateField("requirePhone", v)}
            />
            <Label>Puhelin pakollinen</Label>
          </div>
        </div>
      </section>

      <Button onClick={() => void save()} disabled={saving}>
        {saving ? "Tallennetaan…" : "Tallenna asetukset"}
      </Button>
    </div>
  );
}
