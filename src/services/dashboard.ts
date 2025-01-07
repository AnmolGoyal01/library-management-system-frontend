import axiosInstance from "../utils/axiosInstance";

class DashboardService {
  axiosInstance: any;
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  // Borrow a book
  async getDashboard() {
    try {
      const response = await this.axiosInstance.get(`/dashboard/`);
      return response.data;
    } catch (error) {
      console.log("DashboardService error:", error);
    }
  }
}

export default new DashboardService();
