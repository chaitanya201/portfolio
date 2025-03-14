import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <div className="relative min-h-screen">
      <Navbar />

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
