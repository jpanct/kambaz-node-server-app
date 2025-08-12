// src/Kambaz/Account/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
  currentUser: null as any,
  users: [...db.users], // Create a copy of the array
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      // This is the correct way to add to array in Redux Toolkit
      state.users = [...state.users, action.payload];
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user: any) => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
        if (state.currentUser && state.currentUser._id === action.payload._id) {
          state.currentUser = action.payload;
        }
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user: any) => user._id !== action.payload);
    },
  },
});

export const { setCurrentUser, setUsers, addUser, updateUser, deleteUser } = accountSlice.actions;
export default accountSlice.reducer;