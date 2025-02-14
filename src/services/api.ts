import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../constants/api_routes";

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem("authToken");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

api.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
