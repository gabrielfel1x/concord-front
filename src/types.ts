export interface Message {
  id: string;
  content: string;
  sender: UserPublic;
  timestamp: Date;
}

export interface Chatroom {
  id: string;
  name: string;
  users: UserAttr[];
  createdAt: string;
}
export interface UserAttr {
  id: string;
  attributes: {
    name: string;
    email: string;
  };
}
export interface User {
  id?: string;
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export type UserPublic = Omit<User, 'password' | 'password_confirmation'>;
export interface RootObjectUser {
	user: User;
}

export type LoginCredentials = Pick<User, 'email' | 'password'>

export type ObjectUserLogin = { user: LoginCredentials }

export interface AuthResponse {
  user: UserPublic;
  token: string;
}

export interface APIResponse<T> {
  data: {
    id: string;
    type: string;
    attributes: T;
  };
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