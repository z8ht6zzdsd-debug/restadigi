import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nakyvyys-ja-suunnittelu")({
  beforeLoad: () => {
    throw redirect({ to: "/nakyvyys" });
  },
});
