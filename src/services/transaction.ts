import axiosInstance from "../utils/axiosInstance";

class TransactionService {
  axiosInstance: any;
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  // Borrow a book
  async borrowBook(bookId: string) {
    try {
      const response = await this.axiosInstance.post(
        `/transactions/borrow/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.log("TransactionService error:", error);
    }
  }

  // Return a book
  async returnBook(bookId: string) {
    try {
      const response = await this.axiosInstance.post(
        `/transactions/return/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.log("TransactionService error:", error);
    }
  }

  async getBorrowedBooks(page: number = 1, limit: number = 10) {
    try {
      const response = await this.axiosInstance.get("/transactions/borrowed", {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.log("TransactionService error:", error);
    }
  }

  //   // Get all transactions for a user
  //   async getUserTransactions(userId: string) {
  //     try {
  //       const response = await this.axiosInstance.get(
  //         `/transactions/user/${userId}`
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.log("TransactionService error:", error);
  //     }
  //   }

  //   // Get all transactions (Admin use case)
  //   async getAllTransactions() {
  //     try {
  //       const response = await this.axiosInstance.get("/transactions");
  //       return response.data;
  //     } catch (error) {
  //       console.log("TransactionService error:", error);
  //     }
  //   }
}

export default new TransactionService();
