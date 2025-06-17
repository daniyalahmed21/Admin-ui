import { useMutation, useQuery } from "@tanstack/react-query";
import { login, self } from "@/features/auth/api/auth.api";
import { useEffect } from "react";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
});

export const useGetUserData = (isLoggedIn: boolean) => {
  const query = useQuery({
    queryKey: ["user-data"],
    queryFn: self,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    console.log(query.data)
    if (query.data) {
      localStorage.setItem("user", JSON.stringify(query.data));
    }
  }, [query.data]);

  return query;
};
