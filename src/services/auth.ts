import axiosInstance from "../utils/axiosInstance";

class AuthService {
  axiosInstance: any;
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  async loginUser(email: string, password: string) {
    try {
      const response = await this.axiosInstance.post("/user/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log("AuthService error:", error);
    }
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
    isAdmin?: boolean
  ) {
    try {
      const response = await this.axiosInstance.post("/user/register", {
        name,
        email,
        password,
        isAdmin: isAdmin,
      });
      if (!response?.data) {
        throw new Error("Registration failed");
      }
      return this.loginUser(email, password);
    } catch (error) {
      console.log("AuthService error:", error);
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.axiosInstance.get("/user/me");
      return response.data;
    } catch (error) {
      console.log("AuthService error:", error);
    }
  }

  async logoutUser() {
    try {
      const response = await this.axiosInstance.post("/user/logout");
      return response.data;
    } catch (error) {
      console.log("AuthService error:", error);
    }
  }
}

export default new AuthService();
