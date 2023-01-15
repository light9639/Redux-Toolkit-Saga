import { call, put } from "redux-saga/effects";
import { setUser, failedGetUser } from "../userSlice";
import { fetchUser } from "../../api/api";

export function* handleGetUser() {
    try {
        const res: string = yield call(fetchUser);
        yield put(setUser(res));
    } catch (error) {
        yield put(failedGetUser(error));
    }
}
