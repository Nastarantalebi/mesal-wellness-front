// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  isLoggedIn: boolean | null;
  organsId: number | null;
  setOrganId: (organsId: number) => void;
  setLogin: (token: string) => void;
  logout: () => void;
};

const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: null,
      accessToken: null,
      organsId: null,

      setOrganId: (organsId: number) => set({ organsId }),
      setLogin: (accessToken: string) => set({ accessToken, isLoggedIn: true }),
      logout: () =>
        set({ accessToken: null, isLoggedIn: false, organsId: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthState;
