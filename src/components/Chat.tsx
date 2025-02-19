import { useState, useRef, useEffect } from 'react';
import { Menu, Users, Hash, Home, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Sidebar } from './Sidebar';
import { Modal } from './Modal';
import { useAuth } from '../hooks/useAuth';
import { useGeneral } from '../hooks/useGeneral';
import type { SidebarState, Message } from '../types';
import { UserAvatar } from './UserAvatar';
import { createMessage } from '../services/messageService';
import { ModalUsersList } from './ModalListUsers';
import ConcordLogo from "../assets/concord.png";

export function Chat() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentChannelIndex, setCurrentChannelIndex] = useState<number | null>(null);
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    isOpen: false,
    activeTab: 'channels',
  });
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatRooms } = useGeneral();
  const messages = chatRooms[currentChannelIndex - 1]?.attributes.messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChannelIndex, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  const homeReturn = () => {
    setCurrentChannelIndex(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSendMessage = async (content: string) => {
    if (!user || !currentChannelIndex) {
      console.error("User or current channel index is missing");
      return;
    }
    try {
      await createMessage(content, chatRooms[currentChannelIndex - 1].id);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleChannelSelect = (position: number) => {
    setCurrentChannelIndex(position + 1);
    setSidebarState({ ...sidebarState, isOpen: false });
  };

  const userColor = user?.color;

  return (
    <div className="min-h-screen bg-[#18181B] text-[#9D9DA7] flex">
      <Sidebar
        isOpen={sidebarState.isOpen}
        onClose={() => setSidebarState({ ...sidebarState, isOpen: false })}
        activeTab={sidebarState.activeTab}
        setActiveTab={(tab) => setSidebarState({ ...sidebarState, activeTab: tab })}
        onChannelSelect={handleChannelSelect}
        currentChannel={currentChannelIndex !== null ? chatRooms[currentChannelIndex - 1] : null}
      />

      <div className="flex-1 flex flex-col">
        <header className="fixed z-10 w-full h-20 lg:px-24 px-4 bg-[#18181B] bg-opacity-70 border-b border-[#202022] flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setSidebarState({ ...sidebarState, isOpen: true })}
              className="p-1 hover:bg-[#202022] rounded-md cursor-pointer"
            >
              <Menu size={20} className="text-[#9D9DA7] hover:text-white/80" />
            </button>
            <div className="flex flex-row items-center justify-center gap-2">
              {currentChannelIndex && <Hash size={20} className="text-[#9D9DA7]" />}
              <h1 className="font-semibold">{currentChannelIndex ? chatRooms[currentChannelIndex - 1].attributes.name : 'Concord'}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#18181B] rounded-md gap-2">
              <button className="p-2 text-[#9D9DA7] rounded-sm hover:bg-[#202022] hover:text-white/80 cursor-pointer" onClick={homeReturn}>
                <Home size={20} />
              </button>
              <button
                onClick={() => setIsUsersModalOpen(true)} 
                className="p-2 text-[#9D9DA7] rounded-sm hover:bg-[#202022] hover:text-white/80 cursor-pointer"
              >
                <Users size={20} />
              </button>
              <div className="mx-2 h-6 w-px bg-[#202022]"></div>
              <button
                onClick={() => setIsUserModalOpen(true)}
                className="p-2 text-[#9D9DA7] cursor-pointer rounded-sm transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <UserAvatar name={user?.name} color={userColor} />
              </button>
            </div>
          </div>
        </header>

        {currentChannelIndex !== null && chatRooms[currentChannelIndex - 1] ? (
          <>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#202022] scrollbar-track-transparent flex flex-col-reverse mb-24">
              <div ref={messagesEndRef} />
              <div className="py-4 flex flex-col gap-4">
                {chatRooms[currentChannelIndex - 1]?.attributes?.messages.map((message: Message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isCurrentUser={message.user.id === String(user?.id)}
                  />
                ))}
              </div>
            </div>
            <ChatInput onSendMessage={handleSendMessage} groupName={chatRooms[currentChannelIndex - 1].attributes.name} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#18181B]">
            <img src={ConcordLogo} alt="Logo" className="w-96 h-96 opacity-10" />
          </div>
        )}
      </div>

      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title="User Settings"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-2">
            <UserAvatar name={user?.name} color={userColor} />
            <div>
              <div className="font-medium text-white">{user?.name}</div>
              <div className="text-sm text-[#9D9DA7]">Online</div>
            </div>
          </div>
          <hr className="border-[#202022]" />
          <button
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-[#202022] text-red-400 hover:text-red-300"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </Modal>
      <ModalUsersList
        isOpen={isUsersModalOpen}
        onClose={() => setIsUsersModalOpen(false)}
      />
    </div>
  );
}
