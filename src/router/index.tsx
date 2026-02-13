import { createBrowserRouter } from "react-router";
import AuthInitializer from "@/Auth-Initializer";
import Login from "@/features/auth/pages/login-page";
import Unauthorized from "@/features/auth/pages/unauthorized";
import ProtectedRoute from "@/features/auth/components/protected-route";
import AdminDashboard from "@/features/dashboard/pages/dashboard-page";
import { HomePage } from "@/features/dashboard/pages/home-page";

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
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <HomePage /> },
          // { path: "users", element: <UsersPage /> }, 
          // { path: "orders", element: <OrdersPage /> },
        ]
      },
      {
        path: "customer-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
