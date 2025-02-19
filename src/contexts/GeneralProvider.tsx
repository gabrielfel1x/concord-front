import React, { useState, useEffect } from "react";
import { GeneralContext } from "./GeneralContext";
import useUserChannel from "../hooks/useUserChannel";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { UserAvatar } from "../components/UserAvatar";
import { formatDistanceToNow } from "../utils";
import { X } from "lucide-react";

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
      const filteredRooms = prev.filter((room) => String(room.id) === String(newMessage.chat_room_id));
      
      if (filteredRooms.length === 0) {
        console.warn("Sala de chat não encontrada para a mensagem recebida:", newMessage);
        return prev;
      }
      
      const chatRoom = filteredRooms[0];
      const updatedMessages = [...(chatRoom.attributes.messages || []), newMessage];
      const updatedAttributes = { ...chatRoom.attributes, messages: updatedMessages };
  
      const updatedChatRoom = { ...chatRoom, attributes: updatedAttributes };

      if (newMessage.user.id !== userID) {
        toast.custom((t) => (
          <div
            className={`relative ${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-[#36393f] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-[#202225] max-h-[200px] overflow-y-auto`}
          >
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <X size={20} />
            </button>
  
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <UserAvatar name={newMessage.user.name} color={newMessage.user.color} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">{newMessage.user.name} <span className="text-xs text-gray-400">em {chatRoom.attributes.name}</span></p>
                  <p className="mt-1 text-sm text-[#b9bbbe]">{newMessage.content}</p>
                  <span className="text-xs text-gray-500">{formatDistanceToNow(newMessage.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        ), { position: "bottom-right", duration: 2000 });
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