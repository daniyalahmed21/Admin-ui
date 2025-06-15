import type { AuthStore, UserResponse } from '@/features/auth/types/auth.types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useAuthStore = create<AuthStore>()(devtools((set) => ({
    user: null,
    setUser: (user: UserResponse | null) => set({ user }),
    clearUser: () => set({ user: null }),
}), {
    name: "auth-store",
}))

export default useAuthStore
