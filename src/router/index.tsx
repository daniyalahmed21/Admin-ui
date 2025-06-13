import { createBrowserRouter } from "react-router";
import AuthInitializer from "@/Auth-Initializer";
import Dashboard from "@/features/dashboard/pages/dashboard-page";
import Login from "@/features/auth/pages/login-page";
import Unauthorized from "@/features/auth/pages/unauthorized";
import ProtectedRoute from "@/features/auth/components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthInitializer />,
    children: [
      { path: "login", element: <Login /> },
      { path: "unauthorized", element: <Unauthorized /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin", "manager"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "customer-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
