import { useEffect } from "react";
import cable from "../services/cable";

const useUserChannel = (userId: number | undefined, setChatRooms: any, addNewGroup: any) => {
  useEffect(() => {
    if (!userId) return;

    cable.subscriptions.create(
      { channel: "UserChannel" },
      {
        received: (data) => {
          if (data.type === "initial_data" && data.chat_rooms) {
            console.log(data.chat_rooms.data);
            setChatRooms(data.chat_rooms.data);
          }

          if (data.type === "new_chat_room") {
            addNewGroup(data.chat_room.data);
          }
        },
        connected: () => console.log("Conectado ao UserChannel"),
        disconnected: () => console.log("Desconectado do UserChannel"),
      }
    );
  }, [userId]);
};

export default useUserChannel;
