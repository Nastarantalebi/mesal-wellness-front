import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  authenticate,
  authUser,
  sidebarMenu,
} from "@/features/auth/_services/authServices";
import type { TAuth, TResponseUser } from "../_types/types";
import type { TSidebarMenu } from "@/features/dashboard/_types/types";

type AuthState = {
  auth: TAuth | null;
  userData: TResponseUser | null;
  sidebar: TSidebarMenu | any;
  setAuth: (auth: TAuth) => void;
  setUserData: (data: TResponseUser) => void;
  clearAuth: () => void;
  refreshAuth: () => Promise<void>;
  fetchUserData: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      userData: null,
      sidebar: null,
      setAuth: (auth) => set({ auth }),
      setUserData: (data) => set({ userData: data }),
      clearAuth: () => set({ auth: null, userData: null }),
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
      fetchUserData: async () => {
        try {
          const userData = await authUser();
          if (userData?.code === 200) {
            set({ userData });
            const sidebar = await sidebarMenu();
            if (sidebar?.code === 200) {
              set({ sidebar });
            } else {
              set({ sidebar: null });
            }
          } else {
            set({ userData: null, sidebar: null });
          }
        } catch {
          set({ userData: null, sidebar: null });
        }
      },
    }),
    {
      name: "auth-store",
    }
  )
);
