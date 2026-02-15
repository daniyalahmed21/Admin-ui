import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, self } from "@/features/auth/api/auth.api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });
};

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: self,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};


