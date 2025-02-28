import { createConsumer } from "@rails/actioncable";
import { API_BASE_URL } from "../constants/api_routes";

export const createCable = (token: string) => {
  return createConsumer(`${API_BASE_URL}/cable?token=${token}`);
}