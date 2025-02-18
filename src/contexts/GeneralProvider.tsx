import React, { useState } from "react";
import { GeneralContext } from "./GeneralContext";
import useUserChannel from "../hooks/useUserChannel";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const { userID } = useAuth(); // Obtém o usuário autenticado

  const addNewGroup = (newGroup: any) => {
    toast.success("Você foi adicionado ao grupo: " + newGroup.attributes.name);
    setChatRooms((prev) => [...prev, newGroup]);
  };

  // 🔹 Só chama o hook se userID estiver definido
  useUserChannel(userID || undefined, setChatRooms, addNewGroup);

  const value = { chatRooms, setChatRooms };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};