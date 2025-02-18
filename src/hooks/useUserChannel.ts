import { useEffect } from "react";
import cable from "../services/cable";

const useUserChannel = (userId: number | undefined, setChatRooms: any) => {
  useEffect(() => {
    if (!userId) return;

    cable.subscriptions.create(
      { channel: "UserChannel" },
      {
        received: (data) => {
          console.log("Nova mensagem recebida no WebSocket:", data);

          if (data.type === "initial_data" && data.chat_rooms) {
            setChatRooms(data.chat_rooms.data);
          }
        },
        connected: () => console.log("Conectado ao UserChannel"),
        disconnected: () => console.log("Desconectado do UserChannel"),
      }
    );
  }, [userId]);
};

export default useUserChannel;
