import axios from "axios";
import type {
  IForgotPassword,
  ISendMobile,
  ISendOTP,
  TChangePass,
} from "../_types/types";
import { Request } from "@/libs/httpService";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
export async function sendMobile(values: ISendMobile) {
  const { data } = await Request.post(`${LOGIN_URL}/otp/request/`, values);
  return data;
}
export async function sendPassword(values: ISendMobile) {
  const { data } = await Request.post(`${LOGIN_URL}/login/`, values);
  return data;
}
export async function forgotPassword(values: IForgotPassword) {
  const { data } = await Request.post(`${LOGIN_URL}/forgot-password/`, values);
  return data;
}
export async function changePassword(values: TChangePass) {
  const { data } = await Request.post(
    `${LOGIN_URL}/me/change-password/`,
    values
  );
  return data;
}

export async function login(values: ISendOTP) {
  const { data } = await Request.post(`${LOGIN_URL}/otp/login/`, values);
  return data;
}

export async function logout() {
  const { data } = await Request.post(`${LOGIN_URL}/logout/`);
  return data;
}

export const removeFcmToken = async (token: string) => {
  await axios.post(
    `${BASE_URL}/fcm/unregister/`,
    { token },
    { withCredentials: true }
  );
};
export async function refreshToken(values: { refresh: string }) {
  const { data } = await Request.post("/refresh/", values);
  return data;
}
