import { logout } from "@/features/auth/_services/authServices";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

// ---- Single Axios instance ----
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ارسال کوکی‌ها، مخصوصاً HttpOnly
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

// ---- Refresh-on-401 (HttpOnly refresh cookie) ----
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (v: any) => void;
  reject: (e: any) => void;
}> = [];

const processQueue = (error: any) => {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve(null)));
  pendingQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) return Promise.reject(error);

    // جلوگیری از refresh در مسیر login
    const isLoginRoute = window.location.pathname.startsWith("/login");
    if (isLoginRoute) return Promise.reject(error);
    const status = error.response.status;
    const data = error.response.data as { code?: string };
    const code = data.code;
    if (status === 401) {
      if (code === "USER_NOT_FOUND") {
        await logout().catch(() => {});
        window.location.replace("/login");
        return Promise.reject(error);
      }
      if (!original._retry) {
        original._retry = true;
        if (isRefreshing) {
          // اگر refresh در حال اجراست، صف بگذار
          return new Promise((resolve, reject) => {
            pendingQueue.push({ resolve, reject });
          }).then(() => instance(original));
        }

        isRefreshing = true;

        try {
          // refresh token با HttpOnly cookie
          await axios.post(`${LOGIN_URL}/refresh/`, null, {
            withCredentials: true,
          });

          processQueue(null); // ادامه pending requests
          return instance(original); // اجرای دوباره request اصلی
        } catch (refreshErr) {
          processQueue(refreshErr);
          if (!isLoginRoute) {
            window.location.replace("/login"); // هدایت به login
          }
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

// ---- Plain instance برای login و public routes ----
export const plainInstance = axios.create({
  baseURL: LOGIN_URL,
  withCredentials: true,
});

export default instance;
