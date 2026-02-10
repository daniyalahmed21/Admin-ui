import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/HomePage";
import { LoginPage } from "@/features/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
