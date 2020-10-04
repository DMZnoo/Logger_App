import types from "./types";
import axios from "axios";
import api from "../../api";
export const createLogs = (dispatch) => {
  return async (data) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.post(`/api/logs/create`, data);
    dispatch({ type: types.CREATE_LOGS, payload: res.data });
    dispatch({ type: types.SET_REFERENCE });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};
export const readLogs = (dispatch) => {
  return async (data) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.post("/api/users/", data);
    if (res.data !== "New User") {
      dispatch({ type: types.READ_LOGS, payload: res.data });
      for (let i = 0; i < res.data.length; i++) {
        dispatch({ type: types.SET_REFERENCE });
      }
      dispatch({ type: types.SET_LOADING, payload: false });
    }
  };
};

export const setCurrentLog = (dispatch) => {
  return async (logId) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.get(`/api/logs/${logId}`);
    dispatch({ type: types.SET_VIEW_LOG, payload: res.data });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};
export const updateLogs = (dispatch) => {
  return async (logId, data) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.post(`/api/logs/update/${logId}`, data);
    dispatch({ type: types.UPDATE_LOGS, payload: res.data });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};
export const deleteLogs = (dispatch) => {
  return async (logId, reqBody) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.post(`/api/users/delete/${logId}`, reqBody);
    console.log(res);
    dispatch({ type: types.DELETE_LOGS, payload: logId });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};
