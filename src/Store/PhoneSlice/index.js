import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phone: null,
};

const phoneSlice = createSlice({
  name: "phoneSlice",
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload.phone;
    },
    clearPhone: (state) => {
      state.phone = null;
    },
  },
});
export default phoneSlice.reducer;
export const { setPhone, clearPhone } = phoneSlice.actions;