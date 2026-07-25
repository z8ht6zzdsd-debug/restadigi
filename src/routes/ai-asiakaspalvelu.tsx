import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-asiakaspalvelu")({
  beforeLoad: () => {
    throw redirect({ to: "/restachat" });
  },
});
