import type { TOption } from "@/types";

export type TRequest = {
  name: string;
  widgets: {
    id: number;
    enabled: boolean;
    order: number;
    config: {
      color: string;
    };
  }[];
};
export type TCreateData = {
  roles: TOption[];
};
