import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/poytavaraupalvelu")({
  beforeLoad: () => {
    throw redirect({ to: "/restatable" });
  },
});
