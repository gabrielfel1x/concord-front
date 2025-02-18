import React, { useState, useEffect } from "react";
import { GeneralContext } from "./GeneralContext";
import useUserChannel from "../hooks/useUserChannel";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const { userID, token } = useAuth();
  const [cable, setCable] = useState<any | null>(null);

  const addNewGroup = (newGroup: any) => {
    if (newGroup.attributes.members.find((member: any) => member.role === "admin").user.id === userID) {
      toast.success("Grupo criado com sucesso!")
    } else {
      toast.success("Você foi adicionado ao grupo: " + newGroup.attributes.name);
    }

    setChatRooms((prev) => [...prev, newGroup]);
  };


  const addNewMessage = (newMessage: any) => {
    setChatRooms((prev) => {
      console.log("Mensagens antes da atualização:", prev);
      const filteredRooms = prev.filter((room) => String(room.id) === String(newMessage.chat_room_id));
      
      if (filteredRooms.length === 0) {
        console.warn("Sala de chat não encontrada para a mensagem recebida:", newMessage);
        return prev;
      }
      
      const chatRoom = filteredRooms[0];
      const updatedMessages = [...(chatRoom.attributes.messages || []), newMessage];
      const updatedAttributes = { ...chatRoom.attributes, messages: updatedMessages };
  
      const updatedChatRoom = { ...chatRoom, attributes: updatedAttributes };

      if (newMessage.user.id != userID) {
        toast.success("Nova mensagem de " + newMessage.user.name + " no grupo " + chatRoom.attributes.name);
      }

      return prev.map((room) => (String(room.id) === String(newMessage.chat_room_id) ? updatedChatRoom : room));
    });
  };

  useEffect(() => {
    if (!token) {
      setCable(null);
      return;
    };

    const { cable } = useUserChannel(token, setChatRooms, addNewGroup, addNewMessage);
    setCable(cable);
    if (cable) {
      cable.disconnect();
    }

    return () => {
      cable.disconnect();
    };
  }, [token]);

  const value = { chatRooms, setChatRooms, cable };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};