import { api } from "../services/api";

const logout = () => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userID");
    sessionStorage.clear();
    api.defaults.headers = {};
    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return false;
  }
};

export default logout;
