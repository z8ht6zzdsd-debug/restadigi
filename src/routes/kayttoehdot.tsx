import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/kayttoehdot")({
  component: () => <LegalPage kind="terms" />,
});
