# Prompt de handoff — Restabooking (majoitusvaraus)

Copia este prompt a otro agente/proyecto (demo o web demo) para portar Restabooking con la misma calidad que Restatable (`/poytavaraupalvelu`).

---

## Objetivo

Implementar **Restabooking**: servicio Restadigi de **reservas de alojamiento** (hoteles, majatalot, mökit, posadas). Misma filosofía que Restatable (reservas de mesa):

1. Landing de producto con demo interactiva
2. Pantallas mock de panel (calendario de estancias + mapa de habitaciones)
3. Config mínima en dashboard (multi-idioma FI/EN/ES)
4. Widget demo que **no persiste** reservas reales
5. Copy claro: se adapta a las necesidades del cliente
6. Sin marcas de terceros; demo inventada (**Hotelli Aava / Hotel Aava**)

## Rutas canónicas (repo restadigi)

| Qué | Path |
|-----|------|
| Landing pública | `/majoitusvaraus` |
| Dashboard config | `/dashboard/stay-booking-widget` |
| API config | `GET/PUT /api/stay-booking-config` |
| SQL Neon | `scripts/migrate-stay-booking-widget.sql` → tabla `stay_booking_widget_config` |

## Archivos clave a portar / espejar

```
src/routes/majoitusvaraus.tsx
src/routes/dashboard/stay-booking-widget.tsx
src/routes/api/stay-booking-config.ts
src/components/stay-booking-widget.tsx
src/components/stay-reservations-device-previews.tsx
src/components/stay-rooms-device-previews.tsx
src/lib/stay-booking-config.ts
src/lib/stay-booking-service.ts
src/db/schema.ts  (stayBookingWidgetConfig)
public/stay-booking-brand.jpg
src/assets/hero-hotel-lobby.jpg
src/i18n/messages/{fi,en,es}.ts  → bloque stayBooking
src/i18n/messages/types.ts       → stayBooking
src/i18n/dashboard-ui.ts         → stayBookingWidget + shell.stayBookingWidget
```

Wiring también: `site-header` SERVICE_PATHS + `header.servicesList`, `dashboard-shell` nav, `form-services` id `majoitusvaraus`, `vercel.json` bloque admin para `/majoitusvaraus`.

## Flujo del widget (5 pasos)

1. **Habitación** — tipos configurables (Standard / Vista mar / Suite)
2. **Huéspedes**
3. **Check-in** (calendario)
4. **Noches** (calcula check-out)
5. **Confirmar** (datos + términos) → éxito demo sin guardar

Config por idioma (`locales.fi|en|es`): `propertyName`, `address`, `brandTitle`, `brandSubtitle`, `roomTypes[]`, `termsText`.  
Compartido: imagen, min/max guests, min/max nights, antelación, días cerrados check-in, color.

## UX marketing (como Restatable)

Orden en landing:

1. Hero split (`ServiceSplitHero` + foto hotel)
2. Banda demo + `StayBookingWidget`
3. Preview dispositivos: reservas/estancias (`StayReservationsDevicePreviews`)
4. Preview dispositivos: habitaciones (`StayRoomsDevicePreviews`)
5. Texto “se adapta al cliente”
6. 4 features + CTA precio (~299 €/año)

## i18n

- Locales del sistema: **fi / en / es**
- Path de URL en finlandés (`/majoitusvaraus`); el idioma solo cambia copy
- UI del widget desde `t.stayBooking.demo`
- Contenido del alojamiento demo desde `config.locales[locale]`

## Criterios de aceptación

- [ ] `/majoitusvaraus` funciona en FI, EN y ES (tipos de habitación y textos correctos)
- [ ] Dashboard edita contenido por pestañas de idioma y reglas compartidas
- [ ] GET público de config; PUT solo admin
- [ ] Demo no escribe reservas en DB
- [ ] Nav servicios incluye Restabooking
- [ ] Aspecto Restadigi (no third-party), propiedad ficticia Aava
- [ ] Mensaje claro de producto adaptable al cliente

## SQL

```sql
CREATE TABLE IF NOT EXISTS stay_booking_widget_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  config_json TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Nota de producto

Restabooking = producto **Restadigi** de reservas de **hospedaje**.  
Restatable / pöytävaraus = reservas de **mesa**. Mantener ambos separados en nav, dashboard y APIs.
