import { createContext, Dispatch, SetStateAction } from "react";

interface GeneralContextType {
  chatRooms: any[];
  setChatRooms: Dispatch<SetStateAction<any[]>>;
  setCurrentChatRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  currentChannelIndex: any ;
  setCurrentChannelIndex: any;
  unreadMessages: any;
}

export const GeneralContext = createContext<GeneralContextType>({
  chatRooms: [],
  setChatRooms: () => {},
});