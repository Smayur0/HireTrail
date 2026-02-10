import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../types";

const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: { payload: { user: any; token?: string | null } }
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setInitialized: (state, action: { payload: boolean }) => {
      state.isInitialized = action.payload;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    }
  },
});

export const { setCredentials, logout, setInitialized, setLoading } = userSlice.actions;
export default userSlice.reducer;
