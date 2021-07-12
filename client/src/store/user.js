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
  },
});

const {
  userAuthenticated,
  userCleared,
  userAuthenticatedFailed,
  userprofileeUpdated,
  userAddedToCart,
  purchaseSucceded,
} = slice.actions;

export const registerDriver = (data) =>
  apiCallBegan({
    url: "/users/registerDriver",
    method: "post",
    data,
    msgOnSuccess: "Driver Added",
  });

export const loginUser = (data) =>
  apiCallBegan({
    url: "/auth/signin",
    method: "post",
    data,
    onSuccess: userAuthenticated.type,
  });

// export const userIsAuth = () => (dispatch) => {
//   try {
//     if (!getTokenCookie()) {
//       throw Error();
//     }
//   } catch (err) {
//     userCleared();
//   }

//   dispatch(
//     apiCallBegan({
//       url: "/auth/isauth",
//       headers: getAuthHeader(),
//       onSuccess: userAuthenticated.type,
//       onError: userAuthenticatedFailed.type,
//     })
//   );
// };

// export const updateUserProofile = (data) =>
//   apiCallBegan({
//     url: "/users/profile",
//     method: "patch",
//     data,
//     headers: getAuthHeader(),
//     onSuccess: userprofileeUpdated.type,
//   });

export default slice.reducer;
