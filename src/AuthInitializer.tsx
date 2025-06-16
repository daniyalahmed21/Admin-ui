import { useEffect } from "react";
import { useGetUserData } from "./features/auth/hooks/use-login";
import useAuthStore from "./store/auth.store";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
    const { data, isError } = useGetUserData();
    const { setUser } = useAuthStore();

    useEffect(() => {
        if (data) setUser(data);
        if (isError) setUser(null);
    }, [data, isError, setUser]);

    return <>{children}</>;
};

export default AuthInitializer;
