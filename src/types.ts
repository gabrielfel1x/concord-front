export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Channel {
  id: string;
  name: string;
  messages: Message[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface SidebarState {
  isOpen: boolean;
  activeTab: 'channels' | 'friends';
}