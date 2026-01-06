export type TPermissionItem = {
  id: number;
  name: string;
  label: string;
  module_name: string;
  is_global: number;
  children: TPermissionItem[];
};

export type TPermissions = {
  permissions: {
    [key: string]: TPermissionItem[];
  };
};
export type TRequest = {
  title: string;
  is_global: number;
};
