import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BooksManager from "../redux/books/bookActions";
import transactionService from "../services/transaction";
import { useNavigate } from "react-router-dom";

const BorrowReturnPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booksManager = new BooksManager(dispatch);

  const { books, loading, totalPages } = useSelector(
    (state: RootState) => state.books
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const [totalBorrowedBooksPages, setTotalBorrowedBooksPages] = useState(1);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [currentPageAvailable, setCurrentPageAvailable] = useState(1);
  const [currentPageBorrowed, setCurrentPageBorrowed] = useState(1);
  const booksPerPage = 20;

  // Fetch available books
  const fetchAllAvailableBooks = async (page: number, limit: number) => {
    await booksManager.fetchAllAvailableBooks(page, limit);
  };

  // Fetch borrowed books
  const fetchBorrowedBooks = async (page: number, limit: number) => {
    const response = await transactionService.getBorrowedBooks(page, limit);
    setBorrowedBooks(response.data?.borrowedBooks);
    setTotalBorrowedBooksPages(response.data?.totalPages);
  };

  // Borrow book
  const borrowBook = async (bookId: string) => {
    await transactionService.borrowBook(bookId);
    fetchAllAvailableBooks(currentPageAvailable, booksPerPage);
    fetchBorrowedBooks(currentPageBorrowed, booksPerPage);
  };

  // Return book
  const returnBook = async (bookId: string) => {
    await transactionService.returnBook(bookId);
    fetchAllAvailableBooks(currentPageAvailable, booksPerPage);
    fetchBorrowedBooks(currentPageBorrowed, booksPerPage);
  };

  useEffect(() => {
    fetchAllAvailableBooks(currentPageAvailable, booksPerPage);
  }, [currentPageAvailable]);

  useEffect(() => {
    fetchBorrowedBooks(currentPageBorrowed, booksPerPage);
  }, [currentPageBorrowed]);

  if (loading) return <p className="text-center mt-3">Loading...</p>;

  const handlePageChangeAvailable = (page: number) => {
    setCurrentPageAvailable(page);
  };

  const handlePageChangeBorrowed = (page: number) => {
    setCurrentPageBorrowed(page);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold text-red-600 dark:text-red-400">
          <span onClick={() => navigate("/login")} className="hover:underline">
            Login to Borrow/Return books!
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Borrow and Return Books
      </h1>

      {/* Available Books Section */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Available Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {book.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Author: {book.author}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Year: {book.publicationYear}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Available: {book.availableCount}
            </p>
            <button
              onClick={() => borrowBook(book._id)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Borrow Book
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeAvailable(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPageAvailable === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Borrowed Books Section */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-4">
        Borrowed Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {borrowedBooks.map((borrowedBook : any) => (
          <div
            key={borrowedBook._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {borrowedBook.book.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Author: {borrowedBook.book.author}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Year: {borrowedBook.book.publicationYear}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Borrowed On:{" "}
              {new Date(borrowedBook.borrowDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            {borrowedBook.returnDate && (
              <p className="text-gray-600 dark:text-gray-400">
                Returned On:{" "}
                {new Date(borrowedBook.returnDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
            {!borrowedBook?.returnDate && (
              <button
                onClick={() => returnBook(borrowedBook.book._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Return Book
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {[...Array(totalBorrowedBooksPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeBorrowed(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPageBorrowed === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BorrowReturnPage;
