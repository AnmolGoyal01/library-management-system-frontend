import { IUser } from "../../types/auth";

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

interface SetUserAction {
  type: typeof SET_USER;
  payload: IUser;
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type AuthActionTypes =
  | SetUserAction
  | LogoutUserAction
  | SetLoadingAction
  | SetErrorAction;
