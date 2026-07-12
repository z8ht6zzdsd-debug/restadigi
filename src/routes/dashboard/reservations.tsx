import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

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

function DashboardReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/dashboard/reservations", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Varausten lataus epäonnistui");
        return res.json() as Promise<{ reservations: Reservation[] }>;
      })
      .then((data) => setReservations(data.reservations))
      .catch((err: Error) => setError(err.message));
  }, []);

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
          Demo-varaukset chatbotista — kalenterinäkymä
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
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {reservation.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/80">
                  {reservation.reservationTime} · {reservation.partySize} hlö
                </p>
                {(reservation.guestPhone || reservation.guestEmail) && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[reservation.guestPhone, reservation.guestEmail].filter(Boolean).join(" · ")}
                  </p>
                )}
                {reservation.notes && (
                  <p className="mt-2 text-sm italic text-foreground/70">{reservation.notes}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
