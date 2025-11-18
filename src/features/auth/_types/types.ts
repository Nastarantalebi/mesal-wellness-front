export interface ILogin {
  mobile: string;
  password: string;
}

export interface ISignUp {
  first_name: string;
  last_name: string;
  mobile: string;
  password: string;
  password2: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      mobile: string;
      avatar: string;
    };
    is_superadmin: boolean;
  };
}
