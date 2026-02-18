import client from "@/shared/api/axios";
import type { LoginRequest, LoginResponse, UserResponse } from "../types/auth.types";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await client.post("/auth/login", data);
  return res.data;
};

export const self = async (): Promise<UserResponse> => {
  const res = await client.get("/auth/self");
  return res.data;
};

export const logout = async (): Promise<void> => {
  await client.post("/auth/logout");
};

export const refresh = async (): Promise<void> => {
  await client.post("/auth/refresh", {}, {
    withCredentials: true,
  });
};