import { IBook } from "../../types/book";

export interface BooksState {
  books: IBook[];
  currentPage: number;
  totalBooks: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export const SET_BOOKS = "SET_BOOKS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

interface SetBooksAction {
  type: typeof SET_BOOKS;
  payload: IBook[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type BooksActionTypes =
  | SetBooksAction
  | SetLoadingAction
  | SetErrorAction;
