import { Bounties } from "@/features/Bounties";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bounty/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Bounties />;
}
