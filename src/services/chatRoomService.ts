import { api } from "./api";
import { Chatroom } from "../types";
import { CREATE_CHATROOM } from "../constants/api_routes";

export const createChatroom = async (name: string, members: string[]): Promise<Chatroom> => {
  try {
    const payload = {
      chat_room: { name },
      members
    };
    const response = await api.post(CREATE_CHATROOM, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar chatroom:", error);
    throw new Error("Falha ao criar chatroom");
  }
};
