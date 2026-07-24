/**
 * Client-safe form host checks. Keep in sync with src/lib/form-host.ts.
 */

export const FORM_HOSTNAME = "form.restadigi.fi";
export const FORM_INTAKE_URL = `https://${FORM_HOSTNAME}/form`;

export function isBrowserFormHost(
  hostname = typeof window !== "undefined" ? window.location.hostname : "",
) {
  return hostname.toLowerCase() === FORM_HOSTNAME;
}

export function isBrowserFormPath(pathname: string) {
  return pathname === "/form" || pathname.startsWith("/form/");
}

export function isBrowserAllowedOnForm(pathname: string) {
  if (isBrowserFormPath(pathname)) return true;
  if (pathname.startsWith("/api/") || pathname.startsWith("/assets/")) return true;
  return false;
}
