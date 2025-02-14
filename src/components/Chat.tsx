import { useState, useRef, useEffect, useMemo } from 'react';
import { Menu, Users, Bell, Hash, Home, Inbox, HelpCircle, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Sidebar } from './Sidebar';
import { Modal } from './Modal';
import { useAuth } from '../hooks/useAuth';
import { channels, users } from '../mockData';
import type { Message, SidebarState, Channel } from '../types';
import { Toaster } from 'react-hot-toast';
import { UserAvatar } from './UserAvatar';

export function Chat() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(channels[0].messages);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(channels[0]);
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    isOpen: false,
    activeTab: 'channels',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const homeReturn = () => {
    setCurrentChannel(null);
    setMessages([]);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSendMessage = (content: string) => {
    if (!user) return;
    
    const newMessage: Message = {
      id: String(Date.now()),
      content,
      sender: user,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleChannelSelect = (channel: Channel) => {
    setCurrentChannel(channel);
    setMessages(channel.messages);
    setSidebarState({ ...sidebarState, isOpen: false });
  };

  const filteredMessages = messages.filter((message) =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#2ECC71"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const userColor = useMemo(getRandomColor, []);

  return (
    <div className="min-h-screen bg-[#18181B] text-[#9D9DA7] flex">
      <Sidebar
        isOpen={sidebarState.isOpen}
        onClose={() => setSidebarState({ ...sidebarState, isOpen: false })}
        activeTab={sidebarState.activeTab}
        setActiveTab={(tab) => setSidebarState({ ...sidebarState, activeTab: tab })}
        channels={channels}
        friends={users.filter((u) => u.id !== user?.id)}
        onChannelSelect={handleChannelSelect}
      />

      <div className="flex-1 flex flex-col">
      <Toaster position='top-center' />
        <header className="fixed z-10 w-full h-20 lg:px-24 px-4 bg-[#18181B] bg-opacity-70 border-b border-[#202022] flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setSidebarState({ ...sidebarState, isOpen: true })}
              className="p-1 hover:bg-[#202022] rounded-md cursor-pointer"
            >
              <Menu size={20} className="text-[#9D9DA7] hover:text-white/80" />
            </button>
            <div className="flex flex-row items-center justify-center gap-2">
              {currentChannel && <Hash size={20} className="text-[#9D9DA7]" />}
              <h1 className="font-semibold">{currentChannel?.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#18181B] rounded-md gap-2">
              <button className="p-2 text-[#9D9DA7] rounded-sm hover:bg-[#202022] hover:text-white/80 cursor-pointer" onClick={homeReturn}>
                <Home size={20} />
              </button>
              <button className="p-2 text-[#9D9DA7] rounded-sm hover:bg-[#202022] hover:text-white/80 cursor-pointer">
                <Bell size={20} />
              </button>
              <button className="p-2 text-[#9D9DA7] rounded-sm hover:bg-[#202022] hover:text-white/80 cursor-pointer">
                <Users size={20} />
              </button>
              <div className="mx-2 h-6 w-px bg-[#202022]"></div>
              <div className="relative">
                <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9D9DA7]" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 bg-[#202022] text-sm rounded pl-8 pr-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#9D9DA7] placeholder-[#9D9DA7]"
                />
              </div>
              <button className="p-2 text-[#9D9DA7] rounded-sm hover:bg-[#202022] hover:text-white/80 cursor-pointer">
                <Inbox size={20} />
              </button>
              <button className="p-2 text-[#9D9DA7] rounded-sm hover:bg-[#202022] hover:text-white/80 cursor-pointer">
                <HelpCircle size={20} />
              </button>
              <button
                onClick={() => setIsUserModalOpen(true)}
                className="p-2 text-[#9D9DA7] cursor-pointer rounded-sm transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <UserAvatar name={user?.name} color={userColor} />
              </button>
            </div>
          </div>
        </header>

        {currentChannel ? (
          <>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#202022] scrollbar-track-transparent flex flex-col-reverse mb-24">
              <div ref={messagesEndRef} />
              <div className="py-4 flex flex-col gap-4">
                {filteredMessages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isCurrentUser={message.sender.id === user?.id}
                  />
                ))}
              </div>
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 bg-[#18181B]" />
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
    </div>
  );
}
