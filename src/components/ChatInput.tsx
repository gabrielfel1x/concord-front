import React, { useState } from 'react';
import { Plus, Smile, Gift } from 'lucide-react';
import { Modal } from './Modal';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      <div className="px-4 py-4" style={{ backgroundColor: "#18181B", borderTop: "1px solid #202022" }}>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <button
              type="button"
              onClick={() => setIsAttachmentModalOpen(true)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2"
              style={{
                color: "#9D9DA7",
                borderColor: "#202022",
                transition: "color 0.3s, border-color 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#9D9DA7"}
            >
              <Plus size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message #Jurimetria e Amigos"
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
                <Gift size={20} />
              </button>
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

      <Modal
        isOpen={isAttachmentModalOpen}
        onClose={() => setIsAttachmentModalOpen(false)}
        title="Add Attachment"
      >
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-2 rounded hover:bg-[#202022] text-[#9D9DA7]">
            Upload File
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-[#202022] text-[#9D9DA7]">
            Share Link
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-[#202022] text-[#9D9DA7]">
            Create Invite
          </button>
        </div>
      </Modal>
    </>
  );
};