import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  line1: string;
  line2: string;
  state: string;
  city: string;
  pin: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  linkedin: string;
  gender: string;
  address: Address;
}

const initialState: User[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      const i = state.findIndex((u) => u.id === action.payload.id);
      if (i !== -1) state[i] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return state.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
