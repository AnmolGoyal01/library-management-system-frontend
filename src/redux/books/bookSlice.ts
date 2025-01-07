import { createSlice } from "@reduxjs/toolkit";
import { BooksState } from "./bookTypes";

const initialState: BooksState = {
  books: [],
  currentPage: 1,
  totalBooks: 0,
  totalPages: 1,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload?.books;
      state.currentPage = action.payload?.currentPage;
      state.totalBooks = action.payload?.totalBooks;
      state.totalPages = action.payload?.totalPages;
    },
    setLoading(state, action) {
      state.loading = action.payload?.payload;
    },
    setError(state, action) {
      state.error = action.payload?.payload;
    },
  },
});

export const { setBooks, setLoading, setError } = booksSlice.actions;

export default booksSlice.reducer;
