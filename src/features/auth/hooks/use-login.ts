import { useMutation, useQuery } from "@tanstack/react-query";
import { login, self } from "@/features/auth/api/auth.api";
import type { UserResponse } from "../types/auth.types";
import { useEffect } from "react";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
});

export const useGetUserData = (isLoggedIn: boolean) => {
  const query = useQuery<UserResponse, Error>({
    queryKey: ["user-data"],
    queryFn: self,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (query.data) {
      localStorage.setItem("user", JSON.stringify(query.data));
    }
  }, [query.data]);

  return query;
};
