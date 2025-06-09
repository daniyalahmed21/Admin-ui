import axios from "axios";
import useAuthStore from "@/store/auth.store";

const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Skip if there's no response (network error) or if it's not a 401
        if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
        }

        // Check if this request is already a retry or an auth-related request
        const isAuthRequest = originalRequest.url?.includes("/auth/refresh") || originalRequest.url?.includes("/auth/logout");

        if (isAuthRequest || originalRequest._retry) {
            // If refresh fails or it's already a retry, logout the user
            if (isAuthRequest) {
                useAuthStore.getState().clearUser();
            }
            return Promise.reject(error);
        }

        // Mark as retry and attempt refresh
        originalRequest._retry = true;

        try {
            // Use a clean axios instance for refresh to avoid interceptor conflict
            // Normalize URL to handle potential trailing slashes in baseURL
            const baseUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
            await axios.post(
                `${baseUrl}/auth/refresh`,
                {},
                { withCredentials: true }
            );

            // If refresh succeeds, retry the original request
            return client(originalRequest);
        } catch (refreshError) {
            // If refresh fails (e.g., refresh token expired), clear store and redirect
            useAuthStore.getState().clearUser();
            return Promise.reject(refreshError);
        }
    }
);

export default client;