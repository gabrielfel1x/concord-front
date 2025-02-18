import { createCable } from "../services/cable";

const useUserChannel = (token: string, setChatRooms: any, addNewGroup: any, addNewMessage: any) => {
  let cable = createCable(token);

  const subscription = cable.subscriptions.create(
    { channel: "UserChannel" },
    {
      received: (data) => {
        if (data.type === "initial_data" && data.chat_rooms) {
          console.log("Initial data received:", data.chat_rooms.data); // Log the initial data
          setChatRooms(data.chat_rooms.data);
        }

        if (data.type === "new_chat_room") {
          addNewGroup(data.chat_room.data);
        }

        if (data.type === "new_message") {
          addNewMessage(data.message.data.attributes);
        }
      },
      connected: () => console.log("Conectado ao UserChannel"),
      disconnected: () => console.log("Desconectado do UserChannel"),
    }
  );
  return { cable, subscription  };
};

export default useUserChannel;
