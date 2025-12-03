import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

// single instance
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
  xsrfCookieName: "csrftoken", // Django's default CSRF cookie name
  xsrfHeaderName: "X-CSRFToken", // Django expects this header
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

// ---- Refresh-on-401 (with HttpOnly refresh cookie) ----
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (v: any) => void;
  reject: (e: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  pendingQueue = [];
};

instance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) return Promise.reject(error);

    const isLoginRoute = window.location.pathname.startsWith("/login");
    if (isLoginRoute) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !original?._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then(() => instance(original));
      }

      isRefreshing = true;

      try {
        await axios.post(`${LOGIN_URL}/refresh/`, null, {
          withCredentials: true,
        });

        processQueue(null, null);
        return instance(original);
      } catch (refreshErr) {
        processQueue(refreshErr as any, null);
        if (!isLoginRoute) {
          window.location.assign("/login");
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const plainInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: LOGIN_URL,
  withCredentials: true,
});

export default instance;
