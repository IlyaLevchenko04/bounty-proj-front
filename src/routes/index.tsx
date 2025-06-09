import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../features/IndexPage";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPage />;
}
