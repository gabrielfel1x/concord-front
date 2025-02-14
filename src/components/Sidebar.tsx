import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Channel, SidebarState, UserAttr } from '../types';
import { ModalUsers } from './ModalUsers';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SidebarState['activeTab'];
  setActiveTab: (tab: SidebarState['activeTab']) => void;
  channels: Channel[];
  users: unknown[];
  onChannelSelect: (channel: Channel) => void;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { isOpen, onClose, channels, onChannelSelect } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = (users: UserAttr[]) => {
    console.log('Selected users:', users);
    setIsModalOpen(false);
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
          <div className="mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer flex items-center gap-2 bg-[#34AB70] hover:bg-[#34AB70]/80 px-4 py-2 rounded-md transition-colors w-full"
            >
              <Plus size={20} className="text-white" />
              <span className="text-white">Add User</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/50" onClick={onClose} />

      <ModalUsers
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        maxUsers={7}
      />
    </div>
  );
};
