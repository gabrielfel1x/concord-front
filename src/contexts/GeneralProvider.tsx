import React, { useState } from "react";
import { GeneralContext } from "./GeneralContext";
import useUserChannel from "../hooks/useUserChannel";
import { useAuth } from "../hooks/useAuth";

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);

  const { userID } = useAuth();

  useUserChannel(userID, setChatRooms);

  const value = { chatRooms, setChatRooms };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};