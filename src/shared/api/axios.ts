import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Avoid circular dependency by using dynamic import or accessing state directly
// For now, we'll implement the interceptor here and handle logout via a callback if needed
// or just clear the store state directly.

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Skip if it's already a refresh or logout request to avoid loops
        const isRefreshRequest = originalRequest.url === "/auth/refresh";
        const isLogoutRequest = originalRequest.url === "/auth/logout";

        if (error.response?.status === 401 && !isRefreshRequest && !isLogoutRequest) {
            try {
                // Attempt to refresh the token
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                // Retry original request
                return client(originalRequest);
            } catch (refreshError) {
                // If refresh fails, we should clear auth state
                // We'll handle this in the features or via a custom event/callback
                // To keep it clean, we just reject and let the hooks handle it
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default client;