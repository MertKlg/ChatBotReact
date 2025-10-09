import { create, createStore } from "zustand";


interface AuthState {
    accessToken: string | null,
    setAccessToken: (token: string) => void,
    clearAccessToken: () => void,
    getAccessToken: () => string | null
}

const authStorage = create<AuthState>()((set, get) => ({
    accessToken: null,
    setAccessToken: (token) => set((state) => ({ accessToken: token })),
    clearAccessToken: () => set(({ accessToken: null })),
    getAccessToken: () => get().accessToken
}))

export default authStorage