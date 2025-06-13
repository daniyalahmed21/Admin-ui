import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuthStore from "@/store/auth.store";

const AuthInitializer = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    if (user.role === "customer") navigate("/customer-dashboard", { replace: true });
    else navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  return <Outlet />;
};

export default AuthInitializer;
