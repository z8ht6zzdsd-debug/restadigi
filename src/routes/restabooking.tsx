import { createFileRoute, redirect } from "@tanstack/react-router";

/** Brand URL — lodging product lives at /majoitusvaraus. */
export const Route = createFileRoute("/restabooking")({
  beforeLoad: () => {
    throw redirect({ to: "/majoitusvaraus" });
  },
});
