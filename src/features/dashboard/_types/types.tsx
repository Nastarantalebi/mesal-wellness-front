import type { icons } from "@/components/Lucide";

export type TBackendMenu = {
  label: string;
  url: string | null;
  icon: keyof typeof icons | null;
  children: TBackendMenu[];
};
export type TSidebarMenu = {
  code: number;
  is_success: boolean;
  message: string;
  data: { menus: TBackendMenu[] };
};
