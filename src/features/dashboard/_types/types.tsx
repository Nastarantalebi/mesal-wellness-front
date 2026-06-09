import type { icons } from "@/components/Lucide";

export type TBackendMenu = {
  label: string;
  url: string;
  icon: keyof typeof icons;
  children?: TBackendMenu[];
};
export type TDataSidebar = {
  menus: TBackendMenu[];
  organizationId: number;
  userId: number;
  staffId: number;
  permissions: { [key: string]: number };
};
export type TSidebarMenu = {
  code: number;
  is_success: boolean;
  message: string;
  data: TDataSidebar;
};
