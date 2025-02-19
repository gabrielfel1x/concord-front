import { api } from "./api";
import { CREATE_MESSAGE } from "../constants/api_routes";

export const createMessage = async (content: string, chatRoomId: string): Promise<any> => {
  try {
    const payload = {
      message: {
        content: content,
      },
      chat_room_id: chatRoomId,
    };
    const response = await api.post(CREATE_MESSAGE, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar message:", error);
    throw new Error("Falha ao criar message");
  }
};
