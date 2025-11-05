// src/lib/request.ts
import axios from "./axios";

type Config = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Record<string, any>;
};

export const Request = {
  get: ( url: string, params = {}) =>
    axios.get(url, { params }),

  post: ( url: string, body = {}, config: Config = {}) =>
    axios.post(url, body, config),

  put: ( url: string, body = {}, config: Config = {}) =>
    axios.put(url, body, config),

  delete: ( url: string, params = {}) =>
    axios.delete(url, { params }),
};
