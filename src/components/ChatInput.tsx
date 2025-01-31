import React, { useState } from 'react';
import { Plus, Smile, Gift } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="px-4 py-4 bg-zinc-900/95 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Plus size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message   #Jurimetria e Amigos"
            className="w-full bg-zinc-800/50 text-zinc-100 placeholder-zinc-400 rounded-lg pl-14 pr-32 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Gift size={20} />
            </button>
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Smile size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};