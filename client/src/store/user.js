import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = () => ({
  data: {},
  auth: null,
  cart: [],
});

const slice = createSlice({
  name: "user",

  initialState: initialState(),

  reducers: {
    userCleared: (state, action) => initialState(),
    userAuthenticated: (state, action) => {
      state.data = action.payload;
      state.auth = true;
    },
  },
});

const { userAuthenticated, userCleared } = slice.actions;

export const registerDriver = (data) =>
  apiCallBegan({
    url: "/users/registerDriver",
    method: "post",
    data,
    msgOnSuccess: "Driver Added",
  });

export const loginUser = (data) =>
  apiCallBegan({
    url: "/users/logInDriver",
    method: "post",
    data,
    onSuccess: userAuthenticated.type,
  });

export default slice.reducer;
