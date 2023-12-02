import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import userReducer from "../features/authentication/userSlice";
import addressReducer from "../features/authentication/addressSlice";
import orderReducer from "../features/purchaseOrder/orderSlice";
import userCart from "../features/purchaseOrder/cartSlice";
import cartIdReducer from "../features/purchaseOrder/cartIdSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    address: addressReducer,
    order: orderReducer,
    cart: userCart,
    cartId: cartIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
