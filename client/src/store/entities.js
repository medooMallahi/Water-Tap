import { combineReducers } from "redux";

import userReducer from "./user";
import driverReducer from "./drivers";
import notificationsReducer from "./notifications";

export default combineReducers({
  user: userReducer,
  drivers: driverReducer,
  notifications: notificationsReducer,
});
