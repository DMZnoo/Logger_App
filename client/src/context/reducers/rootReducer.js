import types from "../actions/types";
import { createRef } from "react";

export const rootReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    case types.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case types.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case types.RESET_LOGS:
      return { ...state, logs: [], exercises: [] };
    case types.CREATE_LOGS:
      return { ...state, logs: [...state.logs, action.payload] };
    case types.READ_LOGS:
      return { ...state, logs: action.payload };
    case types.SET_VIEW_LOG:
      return { ...state, currentLog: action.payload };
    case types.UPDATE_LOGS:
      return {
        ...state,
        logs: state.logs.map((log, idx) => {
          return log._id === action.payload._id ? action.payload : log;
        }),
      };
    case types.DELETE_LOGS:
      return {
        ...state,
        logs: state.logs.filter(
          (log) => log._id.toString() !== action.payload.toString()
        ),
      };
    case types.READ_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
      };
    case types.CREATE_EXERCISES:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
      };
    case types.UPDATE_EXERCISES:
      return {
        ...state,
        exercises: state.exercises.map((exercise, idx) => {
          return exercise._id === action.payload._id
            ? action.payload
            : exercise;
        }),
      };
    case types.DELETE_EXERCISES:
      return {
        ...state,
        exercises: state.exercises.filter(
          (exercise) => exercise._id.toString() !== action.payload.toString()
        ),
      };

    case types.SET_REFERENCE:
      return { ...state, refToLogs: [...state.refToLogs, createRef()] };

    default:
      return state;
  }
};
