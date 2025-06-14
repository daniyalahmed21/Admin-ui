import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/auth";
import ProtectedRoute from "@/features/auth/components/protected-route";
import Unauthorized from "@/features/auth/pages/unauthorized";
import Dashboard from "@/features/dashboard/pages/dashboard-page";

const router = createBrowserRouter([
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin", "manager"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
