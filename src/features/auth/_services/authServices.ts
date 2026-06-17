import type {
  IForgotPassword,
  ISendMobile,
  ISendOTP,
  TChangePass,
} from "../_types/types";
import { Request } from "@/libs/httpService";
import type { TAvatar } from "@/features/profile/_types/type";

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
    values,
  );
  return data;
}

export async function login(values: ISendOTP) {
  const { data } = await Request.post(`${LOGIN_URL}/otp/login/`, values);
  return data;
}
export async function changeAvatar(values: TAvatar | FormData) {
  const { data } = await Request.put(`${LOGIN_URL}/me/avatar/`, values);
  return data;
}
export async function deleteAvatar() {
  const { data } = await Request.delete(`${LOGIN_URL}/me/avatar/`);
  return data;
}
export async function meInfo() {
  const { data } = await Request.get(`${LOGIN_URL}/me/`);
  return data;
}
export async function logout() {
  const { data } = await Request.post(`${LOGIN_URL}/logout/`, {
    withCredentials: true,
  });
  return data;
}
export async function organization() {
  const { data } = await Request.get(`${LOGIN_URL}/selected_organization/`);
  return data;
}
export async function authenticate() {
  const { data } = await Request.post(`${BASE_URL}basics/authenticate/`);
  return data;
}
export async function authUser() {
  const { data } = await Request.get(`${BASE_URL}basics/auth/user/`);
  return data;
}
export async function sidebarMenu() {
  const { data } = await Request.get(`${BASE_URL}basics/menus/sidebar/`);
  return data;
}
