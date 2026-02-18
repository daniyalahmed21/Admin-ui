import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import useAuthStore from "@/store/auth.store";
import { useGetUserData } from "@/features/auth/hooks/use-login";
import Loader from "@/shared/components/loader";

const AuthInitializer = () => {
    // Fetch current user data from the backend
    const { data, isLoading } = useGetUserData();
    // Access auth store to sync local state
    const { user, setUser, clearUser } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Sync backend data with local Zustand store
    useEffect(() => {
        if (isLoading) return;
        if (data) setUser(data);
        else clearUser();
    }, [data, isLoading, setUser, clearUser]);

    // Handle automated redirection for logged-in users 
    // accessing guest-only routes (root/login)
    useEffect(() => {
        if (!user) return;
        // Redirect based on role when on the entry pages
        if (location.pathname === "/" || location.pathname === "/login") {
            const destination = user.role === "customer" ? "/customer-dashboard" : "/dashboard";
            navigate(destination, { replace: true });
        }
    }, [user, navigate, location.pathname]);

    // Ensure the data is fully fetched and synced before rendering children
    const isFetched = !isLoading;
    const isSynced = isFetched && (!!data === !!user);

    // Show loading state until synchronization is complete
    if (!isSynced) return <Loader />;

    return <Outlet />;
};

export default AuthInitializer;
