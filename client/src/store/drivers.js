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
      state.list = action.payload.data;
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

export const deleteDriver = (data) =>
  apiCallBegan({
    url: "/users/deleteDriver",
    method: "post",
    data,
    msgOnSuccess: "Driver Deleted successfuly",
  });

export const getDrivers = () =>
  apiCallBegan({
    url: "/users/getAllDrivers",
    method: "get",
    onSuccess: driversRecieved.type,
  });

export default slice.reducer;
