/** Production form host (service intake) — mirrors admin host pattern. */

export function getFormOrigin() {
  return (process.env.FORM_ORIGIN ?? "https://form.restadigi.fi").replace(/\/$/, "");
}

export function getFormHostname() {
  try {
    return new URL(getFormOrigin()).hostname.toLowerCase();
  } catch {
    return "form.restadigi.fi";
  }
}

export function isFormHost(hostname: string) {
  return hostname.toLowerCase() === getFormHostname();
}

export function formIntakeUrl() {
  return `${getFormOrigin()}/form`;
}

export function isFormPath(pathname: string) {
  return pathname === "/form" || pathname.startsWith("/form/");
}

/** Paths allowed on form.restadigi.fi (everything else → /form). */
export function isAllowedOnFormHost(pathname: string) {
  if (isFormPath(pathname)) return true;
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/assets/")) return true;
  if (pathname.startsWith("/_server") || pathname.startsWith("/__")) return true;
  if (
    pathname === "/favicon.ico" ||
    pathname === "/favicon.png" ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/robots.txt"
  ) {
    return true;
  }
  if (pathname.startsWith("/restadigi-logo") || pathname.startsWith("/mail/")) return true;
  if (/\.(js|css|map|png|jpe?g|svg|ico|webp|woff2?|txt|xml|json)$/i.test(pathname)) return true;
  return false;
}
