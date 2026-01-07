import axios, { supportAxios } from "./axios";

type Config = {
  params?: Record<string, any>;
  headers?: Record<string, any>;
  timeout?: number;
};

export const Request = {
  get: (url: string, params?: Record<string, any>) => {
    return params ? axios.get(url, { params }) : axios.get(url);
  },

  post: (url: string, body = {}, config: Config = {}) =>
    axios.post(url, body, config),

  put: (url: string, body = {}, config: Config = {}) =>
    axios.put(url, body, config),

  delete: (url: string, params = {}) => axios.delete(url, { params }),
};
export const SupportRequest = {
  post: (url: string, body = {}, config = {}) =>
    supportAxios.post(url, body, config),

  get: (url: string, params?: any) => supportAxios.get(url, { params }),
};
