import { createSlice } from "@reduxjs/toolkit";

const initialState = () => ({});

const slice = createSlice({
  name: "notifications",

  initialState: initialState(),

  reducers: {
    errorAdded: (state, action) => {
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    },
    successAdded: (state, action) => {
      state.success = action.payload.success;
      state.msg = action.payload.msg;
    },
    notificationsSuccessErrorCleared: (state, action) => {
      if (state.error) {
        state.error = null;
        state.msg = null;
      }
      if (state.success) {
        state.success = null;
        state.msg = null;
      }
    },
  },
});

const { errorAdded, successAdded, notificationsSuccessErrorCleared } =
  slice.actions;

export const addError = (msg) => errorAdded({ error: true, msg });

export const addSuccess = (msg) => successAdded({ success: true, msg });

export const clearSuccessErrorNotification = () =>
  notificationsSuccessErrorCleared();

export default slice.reducer;
