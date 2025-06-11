import { create } from "zustand";
import type { AuthState } from "@/features/auth/types/auth.types";

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
