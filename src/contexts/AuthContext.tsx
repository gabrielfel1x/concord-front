import { createContext } from "react";
import { UserPublic } from "../types";

interface AuthContextType {
  userID: number | undefined;
  user: UserPublic | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
