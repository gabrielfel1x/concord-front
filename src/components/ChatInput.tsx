import React, { useState } from 'react';
import { Smile } from 'lucide-react';
interface ChatInputProps {
  onSendMessage: (content: string) => void;
  groupName: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, groupName }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      <div className="px-4 py-4 fixed w-full bottom-0" style={{ backgroundColor: "#18181B", borderTop: "1px solid #202022" }}>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${groupName}`}
              className="w-full bg-[#202022] text-[#9D9DA7] placeholder-[#9D9DA7] rounded-lg pl-14 pr-32 py-3 focus:outline-none"
              style={{ borderColor: "#202022" }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                className="p-2"
                style={{
                  color: "#9D9DA7",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9D9DA7"}
              >
                <Smile size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};