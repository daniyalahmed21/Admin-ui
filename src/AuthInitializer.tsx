import { useEffect } from "react";
import { useGetUserData } from "./features/auth/hooks/use-login";
import useAuthStore from "./store/auth.store";
import Loader from "./shared/components/loader";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
    const { data, isError, isLoading } = useGetUserData();
    const { setUser } = useAuthStore();

    useEffect(() => {
        if (data) setUser(data);
        if (isError) setUser(null);
    }, [data, isError, setUser]);

    if (isLoading) return <Loader />;

    return <>{children}</>;
};

export default AuthInitializer;
