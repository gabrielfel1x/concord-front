import { createConsumer } from "@rails/actioncable";
import { API_BASE_URL } from "../constants/api_routes";

const token = localStorage.getItem("authToken");

const cable = createConsumer(`${API_BASE_URL}/cable?token=${token}`);

export default cable;
