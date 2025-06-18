import type { LoginRequest, LoginResponse } from "../types/auth.types";
import axios from "@/shared/api/axios";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};
