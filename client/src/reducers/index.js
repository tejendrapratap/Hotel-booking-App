import { combineReducers } from "redux";
import { authReducer } from "./auth";
// combine reducer
const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
