import { IBook } from "../../types/book";
import bookService from "../../services/book";
import { setBooks, setLoading, setError } from "./bookSlice";

class BooksManager {
  dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  setBooks(books: IBook[]) {
    this.dispatch(setBooks(books));
  }

  setLoading(loading: boolean) {
    this.dispatch(setLoading(loading));
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  async fetchAllAvailableBooks(page: number = 1, limit: number = 5) {
    try {
      this.setLoading(true);
      const response = await bookService.getAllAvailableBooks(page, limit);
      this.setBooks(response.data);
      this.setLoading(false);
      return response.data;
    } catch (error) {
      this.setError("Failed to fetch books");
      this.setLoading(false);
    }
  }

  async addBook({
    title,
    author,
    publicationYear,
    availableCount,
  }: {
    title: string;
    author: string;
    publicationYear: number;
    availableCount: number;
  }) {
    try {
      this.setLoading(true);
      await bookService.addBook(title, author, publicationYear, availableCount);
      await this.fetchAllAvailableBooks();
      this.setLoading(false);
      return true;
    } catch (error) {
      this.setError("Failed to add book");
      this.setLoading(false);
      console.log("Error adding book:", error);
    }
  }

  async updateBook(bookId: string, updatedBook: IBook) {
    try {
      this.setLoading(true);
      await bookService.updateBook(
        bookId,
        updatedBook.title,
        updatedBook.author,
        updatedBook.publicationYear,
        updatedBook.availableCount
      );
      await this.fetchAllAvailableBooks();
      this.setLoading(false);
    } catch (error) {
      this.setError("Failed to update book");
      this.setLoading(false);
    }
  }

  async deleteBook(bookId: string) {
    try {
      this.setLoading(true);
      await bookService.deleteBook(bookId);
      await this.fetchAllAvailableBooks(); // Refresh books after deleting
      this.setLoading(false);
    } catch (error) {
      this.setError("Failed to delete book");
      this.setLoading(false);
    }
  }
}

export default BooksManager;
