import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartId: "",
};

const cartIdSlice = createSlice({
  name: "cartId",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      console.log("inside setCartIdSlice, action.payload: ", action.payload);
      state.cartId = action.payload;
    },
  },
});

export default cartIdSlice.reducer;

export const { setCartId } = cartIdSlice.actions;
export const selectCartId = (state) => state.cartId;
