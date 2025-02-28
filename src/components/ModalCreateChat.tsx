import { useState } from "react";
import { X } from "lucide-react";

interface ModalCreateChatProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export function ModalCreateChat({ isOpen, onClose, onConfirm }: ModalCreateChatProps) {
  const [chatName, setChatName] = useState("");

  const isValid = chatName.trim().length > 3;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-[#36393f] rounded-md w-full max-w-md text-white shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-[#202225]">
          <h2 className="text-xl font-semibold">Chatroom Name</h2>
          <button onClick={onClose} className="hover:text-gray-400 transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Type a chatroom name..."
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="w-full bg-[#202225] rounded-md px-4 py-2 text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
          />
          {!isValid && chatName.length > 0 && (
            <p className="text-red-500 text-sm mt-2">Chatroom name must be at least 4 characters long.</p>
          )}
        </div>

        <div className="p-4 border-t border-[#202225] bg-[#2f3136]">
          <button
            onClick={() => {
              if (isValid) {
                onConfirm(chatName);
                onClose();
              }
            }}
            disabled={!isValid}
            className={`w-full rounded-md py-2.5 font-medium transition-colors 
              ${isValid ? "bg-[#34AB70] hover:bg-[#34AB70]/80 cursor-pointer" : "bg-gray-500 cursor-not-allowed"}`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
