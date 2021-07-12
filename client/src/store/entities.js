import { combineReducers } from "redux";

import userReducer from "./user";
import notificationsReducer from "./notifications";

export default combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
});
