axiosInstance.interceptors.response.use(
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