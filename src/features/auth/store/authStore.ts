import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  authenticate,
  authUser,
  sidebarMenu,
} from "@/features/auth/_services/authServices";
import type {
  TAuth,
  TDataAuthenticate,
  TDataUserOrganization,
  TResponseUser,
} from "../_types/types";
import type {
  TDataSidebar,
  TSidebarMenu,
} from "@/features/dashboard/_types/types";

type AuthState = {
  auth: TDataAuthenticate | null;
  userData: TDataUserOrganization | null;
  sidebar: TDataSidebar | any;
  setAuth: (data: TAuth) => void;
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
      setAuth: (data) => set({ auth: data.data }),
      setUserData: (data) => set({ userData: data.data }),
      clearAuth: () => set({ auth: null, userData: null, sidebar: null }),
      refreshAuth: async () => {
        try {
          const data: TAuth = await authenticate();
          if (data?.code === 200) {
            set({ auth: data.data });
          } else {
            set({ auth: null });
          }
        } catch {
          set({ auth: null });
        }
      },
      fetchUserData: async () => {
        try {
          const data: TResponseUser = await authUser();
          if (data?.code === 200) {
            set({ userData: data?.data });
            const dataSidebar: TSidebarMenu = await sidebarMenu();
            if (dataSidebar?.code === 200) {
              set({ sidebar: dataSidebar.data });
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
    },
  ),
);
