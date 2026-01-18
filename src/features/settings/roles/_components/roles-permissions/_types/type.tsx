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
  data: {
    permissions: PermissionsGroup;
  };
};
export type TGetById = {
  data: {
    action_class: string;
    created_at: string;
    group: number;
    guard_name: string;
    id: number;
    is_global: number;
    module_name: string;
    name: string;
    pivot: { role_id: number; permission_id: number };
    title: string;
    type: string;
    updated_at: string;
  }[];
};
