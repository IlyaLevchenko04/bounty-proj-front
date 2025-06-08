import { CreateBounty } from "@/features/CreateBounty";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bounty/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateBounty />;
}
