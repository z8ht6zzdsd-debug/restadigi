/** Production admin / marketing host helpers (same Vercel deployment, two domains). */

export function getAdminOrigin() {
  return (process.env.ADMIN_ORIGIN ?? "https://admin.restadigi.fi").replace(/\/$/, "");
}

export function getPublicSiteOrigin() {
  return (process.env.PUBLIC_SITE_ORIGIN ?? "https://www.restadigi.fi").replace(/\/$/, "");
}

export function getAdminHostname() {
  try {
    return new URL(getAdminOrigin()).hostname.toLowerCase();
  } catch {
    return "admin.restadigi.fi";
  }
}

/** Public marketing hosts that must not serve the admin UI. */
const MARKETING_HOSTS = new Set([
  "restadigi.fi",
  "www.restadigi.fi",
  "restadigi.vercel.app",
]);

export function isMarketingHost(hostname: string) {
  return MARKETING_HOSTS.has(hostname.toLowerCase());
}

export function isAdminHost(hostname: string) {
  return hostname.toLowerCase() === getAdminHostname();
}

export function adminLoginUrl() {
  return `${getAdminOrigin()}/dashboard/login`;
}

export function isDashboardPath(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

/**
 * Cross-domain redirects:
 * - restadigi.fi /dashboard* → admin.restadigi.fi/dashboard*
 * - admin.restadigi.fi / → /dashboard/login
 */
export function maybeHostRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const path = url.pathname;

  if (isMarketingHost(host) && isDashboardPath(path)) {
    return Response.redirect(`${getAdminOrigin()}${path}${url.search}`, 307);
  }

  if (isAdminHost(host) && (path === "/" || path === "")) {
    return Response.redirect(`${getAdminOrigin()}/dashboard/login`, 307);
  }

  return null;
}
