import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { UserPublic } from "../types";
import { login as loginService, register as registerService } from "../services/authService";
import toast from "react-hot-toast";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
  
      if (!token || !storedUser || storedUser === "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
      } else {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao recuperar usuário do localStorage:", error);
      setUser(null);
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

  const storageUser = async (userData: any) => {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));
    setUser(userData.user);
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const userData = await registerService({ name, email, password, password_confirmation: password });
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
  };  

  const value = {
    user,
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
