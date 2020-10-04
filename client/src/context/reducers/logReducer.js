import types from "../actions/types";
import { createRef } from "react";

export const logReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    case types.CREATE_LOGS:
      return { ...state, logs: [...state.logs, action.payload] };
    case types.READ_LOGS:
      return { ...state, logs: action.payload };
    case types.UPDATE_LOGS:
      return {
        ...state,
        logs: state.logs.map((log, idx) =>
          log._id === action.payload._id ? action.payload : log
        ),
      };
    case types.DELETE_LOGS:
      return {
        ...state,
        logs: state.logs.filter(
          (log) => log._id.toString() !== action.payload.toString()
        ),
      };
    case types.SET_REFERENCE:
      return { ...state, refToLogs: [...state.refToLogs, createRef()] };

    default:
      return state;
  }
};
