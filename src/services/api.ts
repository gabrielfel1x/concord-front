import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../constants/api_routes";

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers["ngrok-skip-browser-warning"] = "true";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);