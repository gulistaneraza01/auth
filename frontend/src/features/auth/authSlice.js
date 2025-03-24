import { createSlice } from "@reduxjs/toolkit";

const initialState = ["raza"];

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (auth, action) => {
      return auth;
    },
  },
});

export const { login } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
