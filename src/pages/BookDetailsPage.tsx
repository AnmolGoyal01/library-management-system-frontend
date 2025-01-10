import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bookService from "../services/book";
import BooksManager from "../redux/books/bookActions";

interface IBook {
  _id: string;
  title: string;
  author: string;
  publicationYear: number;
  availableCount: number;
}

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const isAdmin = useSelector((state: any) => state.auth?.user?.isAdmin) || false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booksManager = new BooksManager(dispatch);

  const [bookDetails, setBookDetails] = useState<IBook | null>(null);
  const [editable, setEditable] = useState(false);

  const fetchBookDetails = async () => {
    try {
      const response = await bookService.getBookById(bookId || "");
      const book: IBook = response.data;
      setBookDetails(book);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  if (!bookDetails) {
    return <div className="text-center text-xl h-screen dark:text-white dark:bg-gray-900">Book not found</div>;
  }

  const handleDelete = async () => {
    if (!isAdmin) {
      alert("Only admins can delete a book");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      await booksManager.deleteBook(bookId!);
      alert("Book deleted successfully");
      navigate("/");
    }
  };

  const handleEditClick = () => {
    if (!isAdmin) {
      alert("Only admins can edit a book");
      return;
    }
    setEditable(true);
  };

  const handleEditSave = async () => {
    await booksManager.updateBook(bookDetails._id, bookDetails);
    alert("Book updated successfully");
    setEditable(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails!,
      [name]: name === "availableCount" ? parseInt(value, 10) : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {editable ? "Edit Book" : "Book Details"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Book Name
          </label>
          <input
            type="text"
            name="title"
            value={bookDetails.title}
            onChange={handleChange}
            disabled={!editable}
            className={`w-full p-2 border rounded ${
              editable
                ? "border-blue-400 dark:border-blue-500"
                : "border-gray-300 dark:border-gray-700"
            } bg-white dark:bg-gray-700 dark:text-white`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={bookDetails.author}
            onChange={handleChange}
            disabled={!editable}
            className={`w-full p-2 border rounded ${
              editable
                ? "border-blue-400 dark:border-blue-500"
                : "border-gray-300 dark:border-gray-700"
            } bg-white dark:bg-gray-700 dark:text-white`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Year
          </label>
          <input
            type="number"
            name="publicationYear"
            value={bookDetails.publicationYear}
            onChange={handleChange}
            disabled={!editable}
            className={`w-full p-2 border rounded ${
              editable
                ? "border-blue-400 dark:border-blue-500"
                : "border-gray-300 dark:border-gray-700"
            } bg-white dark:bg-gray-700 dark:text-white`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Available Count
          </label>
          <input
            type="number"
            name="availableCount"
            value={bookDetails.availableCount}
            onChange={handleChange}
            disabled={!editable}
            className={`w-full p-2 border rounded ${
              editable
                ? "border-blue-400 dark:border-blue-500"
                : "border-gray-300 dark:border-gray-700"
            } bg-white dark:bg-gray-700 dark:text-white`}
          />
        </div>

        {editable ? (
          <button
            onClick={handleEditSave}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-2"
            >
              Edit Book
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Delete Book
            </button>
          </>
        )}
      </div>
    </div>
  );
}
