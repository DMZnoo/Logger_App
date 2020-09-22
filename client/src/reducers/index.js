import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    userInfo: authReducer,
  });
export default createRootReducer;
