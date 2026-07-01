import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  user: null,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default authSlice.reducer;
export const { login, logout, updateUser } = authSlice.actions;
