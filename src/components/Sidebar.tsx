import React from 'react';
import { X, Users, MessageSquare } from 'lucide-react';
import { Channel, User, SidebarState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SidebarState['activeTab'];
  setActiveTab: (tab: SidebarState['activeTab']) => void;
  channels: Channel[];
  friends: User[];
  onChannelSelect: (channel: Channel) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  channels,
  friends,
  onChannelSelect,
}) => {
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

        <div className="flex border-b border-zinc-700">
          <button
            onClick={() => setActiveTab('channels')}
            className={`flex-1 p-3 text-sm font-medium ${
              activeTab === 'channels'
                ? 'text-zinc-100 border-b-2 border-[#34AB70]'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2 cursor-pointer p-2">
              <MessageSquare size={16} />
              <span>Channels</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 p-3 text-sm font-medium ${
              activeTab === 'friends'
                ? 'text-zinc-100 border-b-2 border-[#34AB70]'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2 cursor-pointer p-2">
              <Users size={16} />
              <span>Friends</span>
            </div>
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'channels' ? (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Channels
              </h3>
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onChannelSelect(channel)}
                  className="cursor-pointer w-full text-left px-2 py-1 rounded hover:bg-zinc-700/50 text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  # {channel.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Friends
              </h3>
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 px-2 py-1 rounded hover:bg-zinc-700/50 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {/* {friend.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-zinc-800" />
                    )} */}
                  </div>
                  <span className="text-zinc-300">{friend.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className="flex-1 bg-black/50"
        onClick={onClose}
      />
    </div>
  );
};