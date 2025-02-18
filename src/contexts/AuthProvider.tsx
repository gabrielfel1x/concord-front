import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { AuthResponse, UserPublic } from "../types";
import { login as loginService, register as registerService } from "../services/authService";
import toast from "react-hot-toast";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [userID, setUserID] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
      const storedUserID = localStorage.getItem("userID");
      setColor(user?.color)
  
      if (!token || !storedUser || storedUser === "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userID");
        setUser(null);
        setUserID(undefined);
      } else {
        setUser(JSON.parse(storedUser));
        setUserID(storedUserID ? JSON.parse(storedUserID) : undefined);
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário do localStorage:", error);
      setUser(null);
      setUserID(undefined);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginService({ email, password });
      await storageUser(userData);
      toast.success("Login successful! 🎉");
    } catch (error) {
      console.error("Erro ao logar:", error);
      toast.error("Failed to login. Please check your credentials.");
      throw new Error("Erro ao logar");
    }
  };

  const storageUser = async (userData: AuthResponse) => {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("userID", JSON.stringify(userData.id))
    setUser(userData.user);
    setUserID(userData.id)
  }

  const register = async (name: string, email: string, password: string, password_confirmation: string, color: string) => {
    try {
      password_confirmation = password
      const userData = await registerService({ name, email, password, password_confirmation, color });
      await storageUser(userData);
      toast.success("Account created successfully! 🎉");
    } catch (err) {
      console.error("Erro ao registrar:", err);
      toast.error("Failed to register. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("logged out!")
  };  

  const value = {
    userID,
    user,
    color,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-zinc-100">Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
