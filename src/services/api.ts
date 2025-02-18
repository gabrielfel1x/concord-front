import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../constants/api_routes";

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
