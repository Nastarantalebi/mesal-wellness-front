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
