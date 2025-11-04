// src/lib/request.ts
import type { TCategory } from "../types";
import axios from "./axios";

type Config = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Record<string, any>;
};

export const Request = {
  get: (category: TCategory, url: string, params = {}) =>
    axios.get(category + url, { params }),

  post: (category: TCategory, url: string, body = {}, config: Config = {}) =>
    axios.post(category + url, body, config),

  put: (category: TCategory, url: string, body = {}, config: Config = {}) =>
    axios.put(category + url, body, config),

  delete: (category: TCategory, url: string, params = {}) =>
    axios.delete(category + url, { params }),
};
