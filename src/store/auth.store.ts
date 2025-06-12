import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AuthState } from "@/features/auth/types/auth.types";

const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthReady: false,

      setUser: (user) => set({ user }),

      clearUser: () =>
        set({
          user: null,
          isAuthReady: true,
        }),

      setAuthReady: (ready) => set({ isAuthReady: ready }),
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
