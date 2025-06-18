import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/api/auth.api";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
});