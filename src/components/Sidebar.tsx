import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { SidebarState, UserAttr } from "../types";
import { ModalUsers } from "./ModalUsers";
import { ModalCreateChat } from "./ModalCreateChat";
import { createChatroom } from "../services/chatRoomService";
import toast from "react-hot-toast";
import { Channel } from "../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SidebarState["activeTab"];
  setActiveTab: (tab: SidebarState["activeTab"]) => void;
  onChannelSelect: (channel: Channel) => void;
  currentChannel: Channel | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onChannelSelect,
  currentChannel
}) => {
  const chatRooms = []
  const [isModalUsersOpen, setIsModalUsersOpen] = useState(false);
  const [isModalChatOpen, setIsModalChatOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserAttr[]>([]);

  const handleConfirmUsers = (users: UserAttr[]) => {
    setSelectedUsers(users);
    setIsModalUsersOpen(false);
    setIsModalChatOpen(true);
  };

  const handleConfirmChat = async (name: string) => {
    const chatroomPromise = createChatroom(name, selectedUsers.map((u) => u.id));

    toast.promise(chatroomPromise, {
      loading: "creating chatroom...",
      success: "chat created successfully",
      error: "error creating chatroom.",
    });

    try {
      const newChatroom = await chatroomPromise;
      console.log("chatroom created:", newChatroom);
    } catch (error) {
      console.error("error creating chatroom:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-lg bg-zinc-800 border-r border-zinc-700 shadow-lg">
        <div className="h-12 flex items-center justify-between p-8 border-b border-zinc-700">
          <h2 className="font-bold text-zinc-100 text-xl">Concord</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-100 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Chat Rooms
            </h3>
            {chatRooms.map((room) => (
              <button
              key={room.id}
              onClick={() => onChannelSelect({ id: room.id, name: room.name, messages: room.messages })}
              className={`cursor-pointer w-full text-left px-2 py-1 rounded transition-colors ${
                room.id === currentChannel?.id 
                  ? "bg-zinc-700 text-white"
                  : "hover:bg-zinc-700/50 text-zinc-300 hover:text-zinc-100"
              }`}
            >
              # {room.name}
            </button>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsModalUsersOpen(true)}
              className="cursor-pointer flex items-center gap-2 bg-[#34AB70] hover:bg-[#34AB70]/80 px-4 py-2 rounded-md transition-colors w-full"
            >
              <Plus size={20} className="text-white" />
              <span className="text-white">New Chatroom</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/50" onClick={onClose} />

      <ModalUsers isOpen={isModalUsersOpen} onClose={() => setIsModalUsersOpen(false)} onConfirm={handleConfirmUsers} maxUsers={7} />
      <ModalCreateChat isOpen={isModalChatOpen} onClose={() => setIsModalChatOpen(false)} onConfirm={handleConfirmChat} />
    </div>
  );
};
