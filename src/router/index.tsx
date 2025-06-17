import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/auth";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
