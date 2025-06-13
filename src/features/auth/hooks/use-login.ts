import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, self } from "@/features/auth/api/auth.api";
import useAuthStore from "@/store/auth.store";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      const userData = await queryClient.fetchQuery({
        queryKey: ["user-data"],
        queryFn: self,
      });

      if (userData) setUser(userData);
    },
  });
};

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["user-data"],
    queryFn: self,
    retry: false,
    refetchOnWindowFocus: false,
  });
};


