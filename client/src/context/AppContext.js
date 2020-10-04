import CreateContext from "./ContextProvider";
import types from "./actions/types";
import {
  readExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "./actions/exerciseAction";
import {
  createLogs,
  deleteLogs,
  readLogs,
  setCurrentLog,
  updateLogs,
} from "./actions/logAction";
import { rootReducer } from "./reducers/rootReducer";

const signIn = (dispatch) => {
  return (user) => {
    dispatch({ type: types.SIGN_IN, payload: user });
  };
};
const signOut = (dispatch) => {
  return (user) => {
    dispatch({ type: types.SIGN_OUT });
  };
};

export const { Context, Provider } = CreateContext(
  rootReducer,
  {
    signIn,
    signOut,
    createLogs,
    readLogs,
    setCurrentLog,
    updateLogs,
    deleteLogs,
    readExercises,
    createExercise,
    updateExercise,
    deleteExercise,
  },
  {
    loading: true,
    isSignedIn: null,
    userId: null,
    logs: [],
    currentLog: [],
    exercises: [],
    refToLogs: [],
  }
);
