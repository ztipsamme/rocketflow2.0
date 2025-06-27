import { create } from 'zustand'

type AuthState = {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
  isLoggedIn: (token: string) => boolean
}
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
  isLoggedIn: (token: string) => Boolean(token),
}))
