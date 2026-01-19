import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authenticate } from "@/features/auth/_services/authServices";
import type { TAuth } from "../_types/types";

type AuthState = {
  auth: TAuth | null;
  setAuth: (auth: TAuth) => void;
  clearAuth: () => void;
  refreshAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (auth) => set({ auth }),
      clearAuth: () => set({ auth: null }),
      refreshAuth: async () => {
        try {
          const auth = await authenticate();
          if (auth?.code === 200) {
            set({ auth });
          } else {
            set({ auth: null });
          }
        } catch {
          set({ auth: null });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
