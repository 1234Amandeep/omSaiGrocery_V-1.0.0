import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    removeAddress: (state, action) => {
      state.address = null;
    },
  },
});

export default addressSlice.reducer;
export const { addAddress, removeAddress } = addressSlice.actions;
export const selectAddress = (state) => state.address;
