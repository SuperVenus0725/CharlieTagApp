import { all } from "redux-saga/effects";

// import dummySaga from "./containers/Dummy/saga";
import newModalSaga from "./containers/NewModalReducer/saga";

function* rootSaga() {
  yield all([newModalSaga()]);
}

export default rootSaga;
