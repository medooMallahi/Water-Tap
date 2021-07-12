import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = () => ({
  list: [],
});

const slice = createSlice({
  name: "drivers",

  initialState: initialState(),

  reducers: {
    driversRecieved: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

const { driversRecieved } = slice.actions;

export const registerDriver = (data) =>
  apiCallBegan({
    url: "/users/registerDriver",
    method: "post",
    data,
    msgOnSuccess: "Driver Added",
  });

export default slice.reducer;
