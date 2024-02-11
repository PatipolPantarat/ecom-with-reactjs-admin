import axios from "axios";
const API_URL = "http://localhost:5000/auth";
class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/admin/login`, {
      username,
      password,
    });
    if (response.status !== 200) {
      throw new Error("Failed to login");
    }
    localStorage.setItem("jwtToken", response.data.jwtToken);
    return response.data;
  }
  logout() {
    localStorage.removeItem("jwtToken");
  }
  async getCurrentUser() {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken || jwtToken === "undefined") return null;

    const response = await axios.get(`${API_URL}/me?jwtToken=${jwtToken}`);
    if (response.status !== 200) {
      throw new Error("Failed to get current user");
    }
    return response.data;
  }
}

export default new AuthService();
