import { createFileRoute } from "@tanstack/react-router";
import AboutMePage from "../components/about/AboutMePage";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AboutMePage />
    </>
  );
}
