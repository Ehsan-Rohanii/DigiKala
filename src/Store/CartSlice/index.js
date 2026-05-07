import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalPrice: 0,
  totalPriceAfterDiscount:0
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalPriceAfterDiscount = 0;
    },
    addToCart: (state, action) => {
      let add = false;
      state.totalPrice += action.payload.price;
      state.totalPriceAfterDiscount += action.payload.priceAfterDiscount;
      state.items = state.items.map((pr) => {
        if (pr._id == action.payload._id) {
          pr.cartQuantity++;
          add = true;
        }
        return pr;
      });
      if (!add) {
        state.items.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((pr) => {
        if (pr._id == action.payload) {
          pr.cartQuantity--;
          state.totalPrice -= pr.price;
          state.totalPriceAfterDiscount -= pr.priceAfterDiscount;

          if (pr.cartQuantity == 0) {
            return false;
          }
        }
        return pr;
      });
    },
    removeItem:(state,action)=>{
      state.items = state.items.filter((pr) => {
        if (pr._id == action.payload) {
          state.totalPrice -= pr.price;
          state.totalPriceAfterDiscount -= pr.priceAfterDiscount;

            return false;
        }
        return true;
      });
    }
  },
});
export const {addToCart,clear,removeFromCart}=cartSlice.actions
export default cartSlice.reducer