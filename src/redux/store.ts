import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./userSlice";
import { watcherSaga } from "./sagas/index";

const reducer = combineReducers({
    users: userReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof store.getState>

export default store;
