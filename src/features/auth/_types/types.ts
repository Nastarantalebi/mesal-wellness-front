export interface ISendMobile {
  mobile: string;
}
export interface ISendPassword {
  mobile: string;
  password: string;
}
export interface IForgotPassword {
  mobile: string;
  new_password: string;
  confirm_password: string;
  otp: string;
}
export type TChangePass = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export interface ISendOTP {
  mobile: string;
  otp: string;
  new_password?: string;
  confirm_password?: string;
}

export interface IOTPResponse {
  type: string;
  mobile: string;
  otp_expire: string;
  new_otp_created: boolean;
  is_used: boolean;
  has_password: boolean;
}

export interface ILoginResponse {
  refresh: string;
  access: string;
}

export type TAuth = {
  is_success: boolean;
  message: string;
  code: number;
  data: {
    is_superadmin: boolean;
    needs_context: boolean;
    organizations: {
      id: number;
      title: string;
      thumb_logo: string | null;
      medium_logo: string | null;
    }[];
  };
};
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
};
export type TResponseUser = {
  is_success: boolean;
  message: string;
  code: number;
  data: TData;
};
