import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import BooksManager from "../redux/books/bookActions";
import { useDispatch } from "react-redux";

const AddBookPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booksManager = new BooksManager(dispatch);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<string>("");
  const [availableCount, setAvailableCount] = useState<string>("");
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold text-red-600 dark:text-red-400">
          <span onClick={() => navigate("/login")} className="hover:underline">
            Login to add books!
          </span>
        </p>
      </div>
    );
  }
  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-xl font-semibold text-red-600 dark:text-red-400">
          Only Admins can add books!
        </p>
      </div>
    );
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      [title, author, publicationYear, availableCount].some((field) => !field)
    ) {
      setError("Please fill in all fields");
      return;
    }
    const addedBook = await booksManager.addBook({
      title,
      author,
      publicationYear: Number(publicationYear),
      availableCount: Number(availableCount),
    });
    if (addedBook) {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Add a New Book
        </h2>
        <InputField
          label="Title"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Author"
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <InputField
          label="Publication Year"
          type="number"
          id="publicationYear"
          value={(publicationYear)}
          onChange={(e) => setPublicationYear(e.target.value)}
        />
        <InputField
          label="Available Count"
          type="number"
          id="availableCount"
          value={availableCount}
          onChange={(e) => setAvailableCount(e.target.value)}
        />

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
          onClick={submitHandler}
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
