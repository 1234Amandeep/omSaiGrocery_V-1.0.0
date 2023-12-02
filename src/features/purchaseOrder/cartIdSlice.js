import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartId: "",
};

const cartIdSlice = createSlice({
  name: "cartId",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
  },
});

export default cartIdSlice.reducer;

export const { setCartId } = cartIdSlice.actions;
export const selectCartId = (state) => state.cartId;
