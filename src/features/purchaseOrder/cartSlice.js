import { createSlice } from "@reduxjs/toolkit";

const storageCart = window.localStorage.getItem("cart");
const jsonData = JSON.parse(storageCart);

const initialState = {
  cart: jsonData,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      // if (action.payload == []) {
      //   console.log("inside if");
      //   state.cart = action.payload;
      //   window.localStorage.setItem("cart", JSON.stringify(state.cart));
      //   return;
      // }

      const { items } = action.payload;

      if (items.length == 0) {
        state.cart = items;
      } else {
        state.cart = items.map((item) => {
          return item;
        });
      }

      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToCart: (state, action) => {
      const data = action.payload;

      console.log("inside cartslice, data: ", data);

      state.cart.push(data);
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateQnt: (state, action) => {
      const { id, qnt } = action.payload;

      state.cart = state.cart.map((item) => {
        if (item.product.id == id) {
          item = { ...item, quantity: qnt };
        }

        return item;
      });

      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {},
    clearCart: (state, action) => {
      // console.log("inside clearCart(),");
      // console.log("id: ", action.payload.id);
      state.cart = state.cart.filter(
        (item) => item.product.id != action.payload
      );

      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    emptyCart: (state, action) => {
      console.log("inside empty cart");
      state.cart = [];
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addNewQnt: (state, action) => {
      // adding only the quantity of that item which already exists in the cart.

      state.cart = action.payload;
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  updateQnt,
  clearCart,
  emptyCart,
  setCart,
  addNewQnt,
} = cartSlice.actions;
export const selectCart = (state) => state.cart;
