import { api } from "./api";
import { LOGIN_USER, REGISTER_USER } from "../constants/api_routes";
import { RootObjectUser, LoginCredentials, ObjectUserLogin, AuthResponse } from "../types";

export const register = async (user: RootObjectUser["user"]): Promise<AuthResponse> => {
  try {
    const payload: RootObjectUser = { user };
    const response = await api.post<AuthResponse>(REGISTER_USER, payload);
    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao registrar:", error);
    throw new Error;
  }
};

export const login = async (user: LoginCredentials): Promise<AuthResponse> => {
  try {
    const payload: ObjectUserLogin = { user };
    const response = await api.post<AuthResponse>(LOGIN_USER, payload);
    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao logar:", error);
    throw new Error;
  }
};
