import axiosInstance from "../utils/axiosInstance";

class BookService {
  axiosInstance: any;
  constructor() {
    this.axiosInstance = axiosInstance;
  }

  // Get all books
  async getAllAvailableBooks(page: number = 1, limit: number = 20) {
    try {
      const response = await this.axiosInstance.get("/books", {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.log("BookService error:", error);
    }
  }

  // Get a single book by ID
  async getBookById(bookId: string) {
    try {
      const response = await this.axiosInstance.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.log("BookService error:", error);
    }
  }

  // Add a new book
  async addBook(
    title: string,
    author: string,
    publicationYear: number,
    availableCount: number
  ) {
    try {
      const response = await this.axiosInstance.post("/books", {
        title,
        author,
        publicationYear,
        availableCount,
      });
      return response.data;
    } catch (error) {
      console.log("BookService error:", error);
    }
  }

  // Update an existing book
  async updateBook(
    bookId: string,
    title?: string,
    author?: string,
    publicationYear?: number,
    availableCount?: number
  ) {
    try {
      const response = await this.axiosInstance.put(`/books/${bookId}`, {
        title,
        author,
        publicationYear,
        availableCount,
      });
      return response.data;
    } catch (error) {
      console.log("BookService error:", error);
    }
  }

  // Delete a book by ID
  async deleteBook(bookId: string) {
    try {
      const response = await this.axiosInstance.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.log("BookService error:", error);
    }
  }
}

export default new BookService();
