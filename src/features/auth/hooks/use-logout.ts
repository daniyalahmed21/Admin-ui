import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/features/auth/api/auth.api";
import useAuthStore from "@/store/auth.store";
import { useNavigate } from "react-router";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const clearUser = useAuthStore((state) => state.clearUser);

    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            clearUser();
            queryClient.removeQueries({ queryKey: ["user-data"] });
            navigate("/login");
        },
        onError: () => {
            clearUser();
            queryClient.removeQueries({ queryKey: ["user-data"] });
            navigate("/login");
        }
    });
};
