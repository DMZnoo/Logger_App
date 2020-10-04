import types from "../actions/types";
import { createRef } from "react";

export const authReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    case types.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case types.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
