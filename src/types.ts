export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
}
export interface User {
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