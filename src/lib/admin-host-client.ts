/**
 * Client-safe admin host checks (no process.env — mirrors production hostnames).
 * Keep in sync with src/lib/admin-host.ts server helpers.
 */

export const ADMIN_HOSTNAME = "admin.restadigi.fi";
export const ADMIN_LOGIN_URL = `https://${ADMIN_HOSTNAME}/dashboard/login`;

export function isBrowserAdminHost(
  hostname = typeof window !== "undefined" ? window.location.hostname : "",
) {
  return hostname.toLowerCase() === ADMIN_HOSTNAME;
}

export function isBrowserDashboardPath(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

export function isBrowserAllowedOnAdmin(pathname: string) {
  if (isBrowserDashboardPath(pathname)) return true;
  if (pathname.startsWith("/api/") || pathname.startsWith("/assets/")) return true;
  return false;
}
