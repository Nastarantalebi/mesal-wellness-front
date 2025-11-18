import { Request } from "../../../libs/httpService";
import Cookies from "js-cookie";
import type { ILogin } from "../_types/types";

export async function login(values: ILogin) {
  const { data } = await Request.post( "basics/auth", values);
  return data;
}

// export async function signUp(values: ISignUp) {
//   const { data }: { data: { success: string } } = await Request.post(
//     "basics",
//     "/auth/signup/",
//     values
//   );
//   return data;
// }

export async function logout() {
  const refreshToken = Cookies.get("refresh_token");
  const { data } = await Request.post( "/auth/logout/", {
    refresh: refreshToken,
  });
  return data;
}

// export async function refreshToken(values: { refresh: string }) {
//   const { data } = await Request.post("basics", "/auth/token/refresh/", values);
//   return data;
// }
