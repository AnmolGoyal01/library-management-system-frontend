import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
    setLoading(state, action) {
      state.loading = action.payload?.payload;
    },
    setError(state, action) {
      state.error = action.payload?.payload;
    },
  },
});

export const { setUser, logoutUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
