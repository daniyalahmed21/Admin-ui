import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuthStore from "@/store/auth.store";
import { useGetUserData } from "@/features/auth/hooks/use-login";
import Loader from "./shared/components/loader";

const AuthInitializer = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const { isLoading, data } = useGetUserData();

  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
  }, [data, user, setUser]);

  useEffect(() => {
    if (!user) return;

    // Only redirect if on login or root to avoid interrupting current page on refresh
    const currentPath = window.location.pathname;
    if (currentPath === "/" || currentPath === "/login") {
      if (user.role === "customer") navigate("/customer-dashboard", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (isLoading) return <Loader />;

  return <Outlet />;
};

export default AuthInitializer;
