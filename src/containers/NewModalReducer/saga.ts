import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import Types from "./types";

function getData(): any {
  return axios.get(
    "https://private-anon-bf1b2a39f0-eugeneshevchuk.apiary-mock.com/tags/{01d690c3-d2c1-49d8-9538-5cc87e0c7f73}/{1}"
  );
}

function* workerSaga(): any {
  try {
    const payload = yield call(getData);
    yield put({ type: Types.DATA_LOADED, payload: payload.data });
  } catch (e) {
    yield put({ type: Types.API_ERRORED, payload: e });
  }
}

export default function* watcherSaga() {
  yield takeEvery(Types.DATA_REQUESTED, workerSaga);
}
