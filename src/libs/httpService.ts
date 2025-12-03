import axios from "axios";

type Config = {
  params?: Record<string, any>;
  headers?: Record<string, any>;
};

export const Request = {
  get: (url: string, params = {}) => axios.get(url, { params }),

  post: (url: string, body = {}, config: Config = {}) =>
    axios.post(url, body, config),

  put: (url: string, body = {}, config: Config = {}) =>
    axios.put(url, body, config),

  delete: (url: string, params = {}) => axios.delete(url, { params }),
};
