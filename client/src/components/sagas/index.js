import { take, put, call, fork, select, all } from "redux-saga/effects";

//subroutines for fetching
function* fetch(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, url || id);
  if (response) yield put(entity.success(id, response));
  else yield put(entity.failure(id, error));
}
