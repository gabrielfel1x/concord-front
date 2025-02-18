import { createContext, Dispatch, SetStateAction } from "react";

interface GeneralContextType {
  chatRooms: any[];
  setChatRooms: Dispatch<SetStateAction<any[]>>;
}

export const GeneralContext = createContext<GeneralContextType>({
  chatRooms: [],
  setChatRooms: () => {},
});