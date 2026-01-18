export type TData = {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    mobile: string;
    avatar: string;
  };
  organization: {
    id: number;
    title: string;
    thumb_logo: string | null;
  };
  staff: {
    id: number;
    employee_code: string;
    staff_type: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      national_code: string | null;
      mobile: string;
    };
    roles: string[];
  };
  organization_id: number;
  staff_id: number;
  roles: string[];
  has_context: boolean;
}[];
export type TResponse = {
  is_success: boolean;
  message: string;
  code: number;
  data: TData;
};
