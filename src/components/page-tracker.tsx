import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import { getOrCreateVisitorSessionId } from "@/lib/visitor-session";

export function PageTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { ready, consent } = useCookieConsent();

  useEffect(() => {
    if (!ready) return;
    if (pathname.startsWith("/dashboard")) return;
    // GDPR / ePrivacy: only track after statistics consent
    if (!consent?.statistics) return;

    const visitorSessionId = getOrCreateVisitorSessionId();
    if (!visitorSessionId) return;

    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorSessionId,
        path: pathname,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => undefined);
  }, [pathname, ready, consent?.statistics]);

  return null;
}
