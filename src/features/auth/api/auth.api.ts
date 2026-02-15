import client from "@/shared/api/axios";
import type { LoginRequest, LoginResponse, UserResponse } from "../types/auth.types";
import axios from "@/shared/api/axios";
import useAuthStore from "@/store/auth.store";

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

export const refresh = async (): Promise<void> => {
  await axios.post("/auth/refresh", {}, {
    withCredentials: true,
  });
};


client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh" &&
      originalRequest.url !== "/auth/logout"
    ) {
      try {
        const headers = originalRequest.headers;
        await refresh();
        return client.request({ ...originalRequest, headers, withCredentials: true });
      } catch (refreshError) {
        useAuthStore.getState().clearUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);