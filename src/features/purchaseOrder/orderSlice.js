import { createSlice } from "@reduxjs/toolkit";

const data = window.localStorage.getItem("userOrder");
const jsonData = JSON.parse(data);

const initialState = {
  order: [jsonData],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      console.log("hello from orderSlice 's addOrder fn");
      let img = action.payload.productImg;
      let title = action.payload.productTitle;
      let price = action.payload.productPrice;

      state.order.push({
        img,
        title,
        price,
      });
      window.localStorage.setItem("userOrder", JSON.stringify(state.order));
    },
  },
});

export default orderSlice.reducer;
export const { addOrder } = orderSlice.actions;
export const selectOrder = (state) => state.order;
