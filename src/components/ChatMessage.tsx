import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from '../utils';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser }) => {
  return (
    <div className="lg:px-36 px-4 py-0.5 group flex items-start gap-4 relative hover:bg-[#202022]">
      <div>{isCurrentUser}</div>
      <div className="relative flex-shrink-0 w-14 h-14">
        {/* <img
          src={message.sender.avatar}
          alt={message.user.name}
          className="rounded-full object-cover"
        /> */}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-base text-white/80 hover:underline cursor-pointer">
            {message.user.name}
          </span>
          <span className="text-xs text-[#9D9DA7]">
            {formatDistanceToNow(message.created_at)}
          </span>
        </div>
        <p className="text-[#9D9DA7] break-words">{message.content}</p>
      </div>
    </div>
  );
};