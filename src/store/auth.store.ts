import type { AuthStore, UserResponse } from '@/features/auth/types/auth.types'
import { create } from 'zustand'

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user: UserResponse | null) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useAuthStore


