import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BooksManager from "../redux/books/bookActions";

// todo - check pagination

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const booksManager = new BooksManager(dispatch);
  const { books, loading, totalPages } = useSelector(
    (state: RootState) => state.books
  );
  const [currentPageState, setCurrentPageState] = useState(1);
  const booksPerPage = 20;

  const fetchAllAvailableBooks = async (page: number, limit: number) => {
    await booksManager.fetchAllAvailableBooks(page, limit);
    console.log("Fetched books", books);
  };

  useEffect(() => {
    fetchAllAvailableBooks(currentPageState, booksPerPage);
  }, [currentPageState]);

  if (loading) return <p className="text-center mt-3">Loading...</p>;

  const handlePageChange = (page: number) => {
    setCurrentPageState(page);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Available Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books?.map((book) => (
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
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)]?.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPageState === index + 1
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

export default HomePage;
