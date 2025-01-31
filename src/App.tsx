import { useState, useRef, useEffect } from 'react';
import { Menu, Users, Bell, Pin, Inbox, HelpCircle, Search } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { channels, currentUser } from './mockData';
// import { users } from './mockData';
import type { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>(channels[0].messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: String(Date.now()),
      content,
      sender: currentUser,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      <header className="h-12 px-4 bg-zinc-900 border-b border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu size={20} className="text-zinc-400" />
          <h1 className="font-semibold">Jurimetria e Amigos</h1>
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
                placeholder="Search"
                className="w-36 bg-zinc-800 text-sm rounded pl-8 pr-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-zinc-400"
              />
            </div>
            <button className="p-2 text-zinc-400 hover:text-zinc-100">
              <Inbox size={20} />
            </button>
            <button className="p-2 text-zinc-400 hover:text-zinc-100">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="py-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.sender.id === currentUser.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;