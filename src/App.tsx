import { useState, useRef, useEffect } from 'react';
import { Menu, Users, Bell, Hash, Pin, Inbox, HelpCircle, Search, LogOut } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import { Modal } from './components/Modal';
import { channels, currentUser, users } from './mockData';
import type { Message, AuthState, SidebarState, Channel } from './types';

function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [messages, setMessages] = useState<Message[]>(channels[0].messages);
  const [currentChannel, setCurrentChannel] = useState<Channel>(channels[0]);
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

  const handleLogin = (email: string, password: string) => {
    setAuth({
      isAuthenticated: true,
      user: currentUser,
    });
  };

  const handleRegister = (email: string, password: string, name: string) => {
    setAuth({
      isAuthenticated: true,
      user: currentUser,
    });
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: String(Date.now()),
      content,
      sender: currentUser,
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

  if (!auth.isAuthenticated) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex">
      <Sidebar
        isOpen={sidebarState.isOpen}
        onClose={() => setSidebarState({ ...sidebarState, isOpen: false })}
        activeTab={sidebarState.activeTab}
        setActiveTab={(tab) => setSidebarState({ ...sidebarState, activeTab: tab })}
        channels={channels}
        friends={users.filter((user) => user.id !== currentUser.id)}
        onChannelSelect={handleChannelSelect}
      />

      <div className="flex-1 flex flex-col">
        <header className="h-12 px-4 bg-zinc-900 border-b border-zinc-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarState({ ...sidebarState, isOpen: true })}
              className="p-1 hover:bg-zinc-800 rounded-md"
            >
              <Menu size={20} className="text-zinc-400" />
            </button>
            <Hash size={20} className="text-zinc-400" />
            <h1 className="font-semibold">{currentChannel.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-zinc-900 rounded-md">
              <button className="p-2 text-zinc-400 hover:text-zinc-100">
                <Pin size={20} />
              </button>
              <button className="p-2 text-zinc-400 hover:text-zinc-100">
                <Bell size={20} />
              </button>
              <button className="p-2 text-zinc-400 hover:text-zinc-100">
                <Users size={20} />
              </button>
              <div className="mx-2 h-6 w-px bg-zinc-700"></div>
              <div className="relative">
                <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search messages"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 bg-zinc-800 text-sm rounded pl-8 pr-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-zinc-400"
                />
              </div>
              <button className="p-2 text-zinc-400 hover:text-zinc-100">
                <Inbox size={20} />
              </button>
              <button className="p-2 text-zinc-400 hover:text-zinc-100">
                <HelpCircle size={20} />
              </button>
              <button
                onClick={() => setIsUserModalOpen(true)}
                className="p-2 text-zinc-400 hover:text-zinc-100"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full"
                />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent flex flex-col-reverse">
          <div ref={messagesEndRef} />
          <div className="py-4">
            {filteredMessages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isCurrentUser={message.sender.id === currentUser.id}
              />
            ))}
          </div>
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title="User Settings"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium text-zinc-100">{currentUser.name}</div>
              <div className="text-sm text-zinc-400">Online</div>
            </div>
          </div>
          <hr className="border-zinc-700" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-zinc-700 text-red-400 hover:text-red-300"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;