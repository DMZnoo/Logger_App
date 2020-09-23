import { take, put, call, fork, select, all } from "redux-saga/effects";
import { api } from "../api";
import * as actions from "../actions";
import { getUser, getExercise, getLog } from "../reducers/selectors";

const { user, log, exercise } = actions;

// re-usable fetch Subroutine
function* fetchEntity(entity, apiFn, id) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, id);
  if (response) yield put(entity.success(id, response));
  else yield put(entity.failure(id, error));
}

export const fetchUser = fetchEntity.bind(null, user, api.fetchUser);
export const fetchLog = fetchEntity.bind(null, log, api.fetchLog);
export const fetchExercise = fetchEntity.bind(
  null,
  exercise,
  api.fetchExercise
);

function* loadUser(username) {
  const user = yield select(getUser, username);
  //call unless it's cached
  if (!user) {
    yield call(fetchUser, username);
  }
}

function* loadLog(_id) {
  const log = yield select(getLog, _id);
  //call unless it's cached
  if (!log) {
    yield call(fetchLog, _id);
  }
}
function* loadExercise(_id) {
  const exercise = yield select(getExercise, _id);
  //call unless it's cached
  if (!exercise) {
    yield call(fetchExercise, _id);
  }
}

//watchers

function* watchUser() {
  while (true) {
    const { username } = yield take(actions.LOAD_USER);

    yield fork(loadUser, username);
  }
}

function* watchLog() {
  while (true) {
    const { _id } = yield take(actions.LOAD_LOG);

    yield fork(loadLog, _id);
  }
}

function* watchExercise() {
  while (true) {
    const { _id } = yield take(actions.LOAD_EXERCISE);

    yield fork(loadExercise, _id);
  }
}

export default function* root() {
  yield all([fork(watchUser), fork(watchLog), fork(watchExercise)]);
}
