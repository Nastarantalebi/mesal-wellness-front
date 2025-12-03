import instance from "./axios";

type Config = {
  params?: Record<string, any>;
  headers?: Record<string, any>;
};

export const Request = {
  get: (url: string, params = {}) => instance.get(url, { params }),

  post: (url: string, body = {}, config: Config = {}) =>
    instance.post(url, body, config),

  put: (url: string, body = {}, config: Config = {}) =>
    instance.put(url, body, config),

  delete: (url: string, params = {}) => instance.delete(url, { params }),
};
