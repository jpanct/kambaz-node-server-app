// src/Kambaz/Account/reducer.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null as any,
  users: [] as any[], // Add this if you're managing users list
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      state.users = state.users.map((user: any) =>
        user._id === action.payload._id ? action.payload : user
      );
      // Update current user if it's the one being updated
      if (state.currentUser?._id === action.payload._id) {
        state.currentUser = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user: any) => user._id !== action.payload);
    },
    signIn: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, addUser, updateUser, deleteUser, signIn, signOut } = accountSlice.actions;
export default accountSlice.reducer;