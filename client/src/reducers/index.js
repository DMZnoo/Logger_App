import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import logReducer from "./logReducer";
import exerciseReducer from "./exerciseReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    userInfo: authReducer,
    logAction: logReducer,
    exerciseAction: exerciseReducer,
  });
export default createRootReducer;
