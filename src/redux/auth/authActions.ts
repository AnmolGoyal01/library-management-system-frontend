import { IUser } from "../../types/auth";
import AuthService from "../../services/auth";
import { setUser, logoutUser, setLoading, setError } from "./authSlice";

class AuthManager {
  dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  setUser(user: IUser) {
    this.dispatch(setUser(user));
  }

  logoutUser() {
    this.dispatch(logoutUser());
  }

  setLoading(loading: boolean) {
    this.dispatch(setLoading(loading));
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  async loginUser(email: string, password: string) {
    try {
      this.setLoading(true);
      const response = await AuthService.loginUser(email, password);
      this.setUser(response.data?.user);
      this.setLoading(false);
      return response.data?.user;
    } catch (error) {
      this.setError("Failed to login");
      this.setLoading(false);
    }
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
    isAdmin?: boolean
  ) {
    try {
      this.setLoading(true);
      const response = await AuthService.registerUser(
        name,
        email,
        password,
        isAdmin
      );
      this.setUser(response.data?.user);
      this.setLoading(false);
      return response.data?.user;
    } catch (error) {
      this.setError("Failed to register");
      this.setLoading(false);
    }
  }

  async getCurrentUser() {
    try {
      this.setLoading(true);
      const response = await AuthService.getCurrentUser();
      this.setUser(response.data);
      this.setLoading(false);
      return response.data;
    } catch (error) {
      this.setError("Failed to fetch current user");
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      await AuthService.logoutUser();
      this.logoutUser();
      return true;
    } catch (error) {
      this.setError("Failed to logout");
    }
  }
}

export default AuthManager;
