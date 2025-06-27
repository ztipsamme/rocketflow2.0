import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
  isLoggedIn: () => Boolean(token),
}))
