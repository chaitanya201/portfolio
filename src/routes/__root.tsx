import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Chatbot from "../components/chatbot/Chatbot";

export const Route = createRootRoute({
  component: () => (
    <div className="relative min-h-screen">
      <Navbar />
      <Chatbot />

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
