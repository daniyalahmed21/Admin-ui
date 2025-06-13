import { Navigate } from "react-router";
import useAuthStore from "@/store/auth.store";
import { useGetUserData } from "@/features/auth/hooks/use-login";
import type { ReactNode } from "react";
import Loader from "@/shared/components/loader";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuthStore();
  const { isLoading, data } = useGetUserData();

  if (isLoading) return <Loader />;

  const currentUser = user || data;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(currentUser.role))
    return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
