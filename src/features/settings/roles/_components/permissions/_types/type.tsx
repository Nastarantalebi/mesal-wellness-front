export type TGroups = {
  data: {
    label: string;
    value: string;
  }[];
};
export type Permission = {
  id: number;
  name: string;
  label: string;
  module_name: string;
  is_global: number;
  children: Permission[];
};

type PermissionsGroup = {
  [groupName: string]: Permission[];
};

export type RootPermissions = {
  permissions: PermissionsGroup;
};
