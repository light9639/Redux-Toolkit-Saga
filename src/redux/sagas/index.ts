import { takeLatest, all } from "redux-saga/effects";
import { handleGetUser } from "./user";
import { getUser } from "../userSlice";

export function* watcherSaga() {
    yield takeLatest(getUser.type, handleGetUser);
}