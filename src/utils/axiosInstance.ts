import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;
//     if (response?.status === 401) {
//       // Handle unauthorized access globally
//       // alert("Session expired. Please log in again.");
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
