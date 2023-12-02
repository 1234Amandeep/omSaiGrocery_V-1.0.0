import { createSlice } from "@reduxjs/toolkit";

const data = window.localStorage.getItem("userData");
const jsonData = JSON.parse(data);

const initialState = {
  user: jsonData,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { displayName, email, photoURL, uid } = action.payload;

      const contact = { displayName, email, photoURL };
      const id = uid;
      state.user = { id, contact };
      window.localStorage.setItem("userData", JSON.stringify(state.user));
    },
    removeUser: (state, action) => {
      state.user = null;
      window.localStorage.setItem("userData", null);
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
export const selectUser = (state) => state.user;
