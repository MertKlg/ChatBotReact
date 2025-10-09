import IProfile from "../model/profile"
import { create, createStore } from "zustand";

interface Profile {
    profile: IProfile | null,
    setProfile: (profile: IProfile) => void,
    removeProfile: () => void,
    getProfile: () => IProfile | null
}

const profileStorage = create<Profile>()((set, get) => ({
    profile: null,
    setProfile: (profile) => set((state) => ({ profile: profile })),
    removeProfile: () => set({ profile: null }),
    getProfile: () => get().profile
}))

export default profileStorage