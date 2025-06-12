import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import useAuthStore from "@/store/auth.store";
import { useGetUserData } from "@/features/auth/hooks/use-login";
import Loader from "@/shared/components/loader";

const AuthInitializer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useGetUserData();
  const { user, setUser, clearUser, setAuthReady } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      setUser(data);
    } else if (isError) {
      clearUser();
    }

    setAuthReady(true); 
  }, [data, isError, isLoading, setUser, clearUser, setAuthReady]);

  useEffect(() => {
    if (!user) return;

    if (location.pathname === "/" || location.pathname === "/login") {
      navigate(
        user.role === "customer"
          ? "/customer-dashboard"
          : "/dashboard",
        { replace: true }
      );
    }
  }, [user, location.pathname, navigate]);

  if (!useAuthStore.getState().isAuthReady) {
    return <Loader />;
  }

  return <Outlet />;
};

export default AuthInitializer;
