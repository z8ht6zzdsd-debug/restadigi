import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/reservations")({
  component: DashboardReservationsPage,
});

type Reservation = {
  id: string;
  guestName: string;
  guestEmail: string | null;
  guestPhone: string | null;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  status: string;
  notes: string | null;
  source: string;
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Odottaa",
  confirmed: "Vahvistettu",
  cancelled: "Peruttu",
};

function DashboardReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadReservations() {
    const res = await fetch("/api/dashboard/reservations", { credentials: "include" });
    if (!res.ok) throw new Error("Varausten lataus epäonnistui");
    const data = (await res.json()) as { reservations: Reservation[] };
    setReservations(data.reservations);
  }

  useEffect(() => {
    void loadReservations().catch((err: Error) => setError(err.message));
  }, []);

  async function updateStatus(id: string, status: "pending" | "confirmed" | "cancelled") {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/dashboard/reservations/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Tilan päivitys epäonnistui");
      const data = (await res.json()) as { reservation: Reservation };
      setReservations((prev) => prev.map((r) => (r.id === id ? data.reservation : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Päivitys epäonnistui");
    } finally {
      setUpdatingId(null);
    }
  }

  const datesWithReservations = useMemo(() => {
    const set = new Set(reservations.map((r) => r.reservationDate));
    return Array.from(set).map((d) => new Date(`${d}T12:00:00`));
  }, [reservations]);

  const selectedDateKey = selectedDate?.toISOString().slice(0, 10);
  const dayReservations = reservations.filter((r) => r.reservationDate === selectedDateKey);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium">Pöytävaraukset</h2>
        <p className="text-sm text-muted-foreground">
          Varaukset chatbotista — sähköposti ja tila näkyvät täällä
        </p>
      </div>

      {error && <p className="text-destructive">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="rounded-sm border border-border bg-card p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{ booked: datesWithReservations }}
            modifiersClassNames={{ booked: "bg-accent/20 font-semibold" }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">
            {selectedDate
              ? selectedDate.toLocaleDateString("fi-FI", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })
              : "Valitse päivä"}
          </h3>

          {dayReservations.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ei varauksia tälle päivälle.</p>
          ) : (
            dayReservations.map((reservation) => (
              <div key={reservation.id} className="rounded-sm border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{reservation.guestName}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs uppercase",
                      reservation.status === "confirmed"
                        ? "bg-accent/20 text-accent"
                        : reservation.status === "cancelled"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {STATUS_LABELS[reservation.status] ?? reservation.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/80">
                  {reservation.reservationTime} · {reservation.partySize} hlö
                </p>
                {reservation.guestEmail && (
                  <p className="mt-1 text-sm">
                    <span className="text-muted-foreground">Sähköposti: </span>
                    <a
                      href={`mailto:${reservation.guestEmail}`}
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {reservation.guestEmail}
                    </a>
                  </p>
                )}
                {reservation.guestPhone && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Puhelin: {reservation.guestPhone}
                  </p>
                )}
                {reservation.notes && (
                  <p className="mt-2 text-sm italic text-foreground/70">{reservation.notes}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {reservation.status !== "confirmed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updatingId === reservation.id}
                      onClick={() => void updateStatus(reservation.id, "confirmed")}
                    >
                      Vahvista
                    </Button>
                  )}
                  {reservation.status !== "cancelled" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updatingId === reservation.id}
                      onClick={() => void updateStatus(reservation.id, "cancelled")}
                    >
                      Peruuta
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
