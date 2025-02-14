import { useEffect, useState } from "react";
import cable from "../services/cable";
import { Channel, UserAttr } from "../types";

const useUserChannel = (userId: number | undefined) => {
  const [chatRooms, setChatRooms] = useState<Channel[]>([]);

  useEffect(() => {
    if (!userId) return;

    const subscription = cable.subscriptions.create(
      { channel: "UserChannel" },
      {
        received: (data) => {
          console.log("Nova mensagem recebida no WebSocket:", data);

          if (data.type === "initial_data" && data.chat_rooms) {
            setChatRooms(
              data.chat_rooms.data.map((room: UserAttr) => ({
                id: room.attributes.id,
                name: room.attributes.name,
              }))
            );
          }
        },
        connected: () => console.log("Conectado ao UserChannel"),
        disconnected: () => console.log("Desconectado do UserChannel"),
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  return chatRooms;
};

export default useUserChannel;
