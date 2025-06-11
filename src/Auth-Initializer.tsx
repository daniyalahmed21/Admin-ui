import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import useAuthStore from "@/store/auth.store";
import { useGetUserData } from "@/features/auth/hooks/use-login";
import Loader from "@/shared/components/loader";

const AuthInitializer = () => {
  const { data, isLoading } = useGetUserData();
  const { user, setUser, clearUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;
    if (data) setUser(data);
    else clearUser();
  }, [data, isLoading, setUser, clearUser]);

  useEffect(() => {
    if (!user) return;
    if (location.pathname === "/" || location.pathname === "/login") {
      navigate(user.role === "customer" ? "/customer-dashboard" : "/dashboard", {
        replace: true,
      });
    }
  }, [user, navigate, location.pathname]);

  const isFetched = !isLoading;
  const isSynced = isFetched && (!!data === !!user);

  if (!isSynced) return <Loader />;

  return <Outlet />;
};

export default AuthInitializer;
