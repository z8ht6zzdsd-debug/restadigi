import { createFileRoute } from "@tanstack/react-router";
import { Plus, Save, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useDashboardUi } from "@/i18n";
import {
  DEFAULT_BOOKING_WIDGET_CONFIG,
  parseBookingWidgetConfig,
  writeBookingWidgetConfigToStorage,
  type BookingWidgetConfig,
  type BookingWidgetType,
} from "@/lib/booking-widget-config";

export const Route = createFileRoute("/dashboard/booking-widget")({
  component: DashboardBookingWidgetPage,
});

const WEEKDAY_OPTIONS = [
  { value: 1, labelKey: "mon" },
  { value: 2, labelKey: "tue" },
  { value: 3, labelKey: "wed" },
  { value: 4, labelKey: "thu" },
  { value: 5, labelKey: "fri" },
  { value: 6, labelKey: "sat" },
  { value: 0, labelKey: "sun" },
] as const;

function DashboardBookingWidgetPage() {
  const t = useDashboardUi();
  const bw = t.bookingWidget;
  const [config, setConfig] = useState<BookingWidgetConfig>(DEFAULT_BOOKING_WIDGET_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/booking-widget-config", { credentials: "include" });
      const data = (await res.json()) as { config?: BookingWidgetConfig; error?: string };
      if (!res.ok) throw new Error(data.error ?? bw.loadFailed);
      if (data.config) {
        const parsed = parseBookingWidgetConfig(data.config);
        setConfig(parsed);
        writeBookingWidgetConfigToStorage(parsed);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : bw.loadFailed);
    } finally {
      setLoading(false);
    }
  }, [bw.loadFailed]);

  useEffect(() => {
    void load();
  }, [load]);

  function update<K extends keyof BookingWidgetConfig>(key: K, value: BookingWidgetConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function updateType(index: number, patch: Partial<BookingWidgetType>) {
    setConfig((prev) => ({
      ...prev,
      bookingTypes: prev.bookingTypes.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    }));
  }

  function addType() {
    setConfig((prev) => ({
      ...prev,
      bookingTypes: [
        ...prev.bookingTypes,
        {
          id: `type-${Date.now()}`,
          name: bw.newTypeName,
          description: "",
          active: true,
        },
      ],
    }));
  }

  function removeType(index: number) {
    setConfig((prev) => ({
      ...prev,
      bookingTypes: prev.bookingTypes.filter((_, i) => i !== index),
    }));
  }

  function toggleClosedDay(day: number) {
    setConfig((prev) => {
      const has = prev.closedWeekdays.includes(day);
      return {
        ...prev,
        closedWeekdays: has
          ? prev.closedWeekdays.filter((d) => d !== day)
          : [...prev.closedWeekdays, day],
      };
    });
  }

  async function save() {
    setSaving(true);
    try {
      const payload = parseBookingWidgetConfig(config);
      const res = await fetch("/api/booking-widget-config", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: payload }),
      });
      const data = (await res.json()) as { config?: BookingWidgetConfig; error?: string };
      if (!res.ok) throw new Error(data.error ?? bw.saveFailed);
      const next = parseBookingWidgetConfig(data.config ?? payload);
      setConfig(next);
      writeBookingWidgetConfigToStorage(next);
      toast.success(bw.saved);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : bw.saveFailed);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">{t.common.loading}</p>;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  const weekdayLabels: Record<string, string> = {
    mon: bw.mon,
    tue: bw.tue,
    wed: bw.wed,
    thu: bw.thu,
    fri: bw.fri,
    sat: bw.sat,
    sun: bw.sun,
  };

  return (
    <div className="space-y-8 pb-6">
      <div className="dashboard-app__page-head flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl tracking-tight text-[#2a2018]">{bw.title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#5c534c]">{bw.subtitle}</p>
        </div>
        <Button type="button" onClick={() => void save()} disabled={saving}>
          <Save className="size-4" />
          {saving ? t.common.saving : t.common.save}
        </Button>
      </div>

      <p className="rounded-xl border border-[#c46a32]/30 bg-[#fff7f0] px-4 py-3 text-sm text-[#43382f]">
        {bw.demoNote}
      </p>

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <h3 className="font-medium">{bw.identity}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>{bw.restaurantName}</Label>
            <Input
              value={config.restaurantName}
              onChange={(e) => update("restaurantName", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{bw.address}</Label>
            <Input value={config.address} onChange={(e) => update("address", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{bw.brandTitle}</Label>
            <Input
              value={config.brandTitle}
              onChange={(e) => update("brandTitle", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.brandSubtitle}</Label>
            <Input
              value={config.brandSubtitle}
              onChange={(e) => update("brandSubtitle", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{bw.brandImageUrl}</Label>
            <Input
              value={config.brandImageUrl}
              onChange={(e) => update("brandImageUrl", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium">{bw.types}</h3>
          <Button type="button" variant="outline" size="sm" onClick={addType}>
            <Plus className="size-4" />
            {bw.addType}
          </Button>
        </div>
        <div className="space-y-4">
          {config.bookingTypes.map((type, index) => (
            <div key={type.id} className="space-y-3 rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={type.active}
                    onCheckedChange={(v) => updateType(index, { active: v })}
                  />
                  <span className="text-sm text-muted-foreground">{bw.active}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={config.bookingTypes.length <= 1}
                  onClick={() => removeType(index)}
                >
                  <Trash2 className="size-3.5" />
                  {t.common.delete}
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{bw.typeName}</Label>
                  <Input
                    value={type.name}
                    onChange={(e) => updateType(index, { name: e.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>{bw.typeDescription}</Label>
                  <Textarea
                    rows={2}
                    value={type.description}
                    onChange={(e) => updateType(index, { description: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <h3 className="font-medium">{bw.rules}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>{bw.minGuests}</Label>
            <Input
              type="number"
              min={1}
              value={config.minGuests}
              onChange={(e) => update("minGuests", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.maxGuests}</Label>
            <Input
              type="number"
              min={1}
              value={config.maxGuests}
              onChange={(e) => update("maxGuests", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.durationMinutes}</Label>
            <Input
              type="number"
              min={30}
              step={15}
              value={config.durationMinutes}
              onChange={(e) => update("durationMinutes", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.slotInterval}</Label>
            <Input
              type="number"
              min={5}
              step={5}
              value={config.slotIntervalMinutes}
              onChange={(e) => update("slotIntervalMinutes", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.openTime}</Label>
            <Input
              type="time"
              value={config.openTime}
              onChange={(e) => update("openTime", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.lastStartTime}</Label>
            <Input
              type="time"
              value={config.lastStartTime}
              onChange={(e) => update("lastStartTime", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.minNoticeHours}</Label>
            <Input
              type="number"
              min={0}
              value={config.minNoticeHours}
              onChange={(e) => update("minNoticeHours", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.advanceDays}</Label>
            <Input
              type="number"
              min={1}
              value={config.advanceBookingDays}
              onChange={(e) => update("advanceBookingDays", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>{bw.slotColor}</Label>
            <Input
              type="color"
              className="h-10 w-20 cursor-pointer p-1"
              value={config.slotAccentColor}
              onChange={(e) => update("slotAccentColor", e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Switch checked={config.showEndTime} onCheckedChange={(v) => update("showEndTime", v)} />
          <Label>{bw.showEndTime}</Label>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">{bw.closedDays}</p>
          <div className="flex flex-wrap gap-2">
            {WEEKDAY_OPTIONS.map((day) => {
              const active = config.closedWeekdays.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleClosedDay(day.value)}
                  className={
                    active
                      ? "rounded-full bg-[#432f24] px-3 py-1.5 text-xs font-medium text-white"
                      : "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  }
                >
                  {weekdayLabels[day.labelKey]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-sm border border-border bg-card p-6">
        <h3 className="font-medium">{bw.terms}</h3>
        <Textarea
          rows={4}
          value={config.termsText}
          onChange={(e) => update("termsText", e.target.value)}
        />
      </section>
    </div>
  );
}
