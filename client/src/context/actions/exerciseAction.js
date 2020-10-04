import axios from "axios";
import types from "./types";
import api from "../../api";

export const createExercise = (dispatch) => {
  return async (logId, data) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.post(`/api/logs/add/${logId}`, data);
    dispatch({ type: types.CREATE_EXERCISES, payload: res.data });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};
export const readExercises = (dispatch) => {
  return async (logId) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.get(`/api/exercises/log/${logId}`);
    dispatch({ type: types.READ_EXERCISES, payload: res.data });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};
export const updateExercise = (dispatch) => {
  return async (id, data) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await api.post(`/api/exercises/update/${id}`, data);
    dispatch({ type: types.UPDATE_EXERCISES, payload: res.data });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};

export const deleteExercise = (dispatch) => {
  return async (logId, id) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    await api.put(`/api/logs/delete/${logId}`, {
      exerciseID: id,
    });
    dispatch({ type: types.DELETE_EXERCISES, payload: id });
    dispatch({ type: types.SET_LOADING, payload: false });
  };
};
