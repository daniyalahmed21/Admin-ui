import type { LoginRequest, LoginResponse, UserResponse } from "../types/auth.types";
import axios from "@/shared/api/axios";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

export const self = async (): Promise<UserResponse> => {
  const res = await axios.get("/auth/self");
  return res.data;
};

export const logout = async (): Promise<void> => {
  await axios.post("/auth/logout");
};