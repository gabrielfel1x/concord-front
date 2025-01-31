import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from '../utils';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser }) => {
  return (
    <div className="px-4 py-0.5 hover:bg-zinc-900/50 group flex items-start gap-4 relative">
      <div className="relative flex-shrink-0 w-10 h-10 mt-1">
        <img
          src={message.sender.avatar}
          alt={message.sender.name}
          className="rounded-full object-cover"
        />
        {/* {message.sender.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-black"></div>
        )} */}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-base hover:underline cursor-pointer">
            {message.sender.name}
          </span>
          <span className="text-xs text-zinc-500">
            {formatDistanceToNow(message.timestamp)}
          </span>
        </div>
        <p className="text-zinc-300 break-words">{message.content}</p>
      </div>
    </div>
  );
};