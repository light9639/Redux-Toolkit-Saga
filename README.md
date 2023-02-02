# 🛠️ Redux-Toolkit, Redux-Saga 연습 페이지입니다.
:octocat: https://light9639.github.io/Redux-Toolkit-Saga/

![light9639 github io_Redux-Toolkit-Saga_](https://user-images.githubusercontent.com/95972251/212889474-e29233b6-69df-4417-b04f-0f8307527637.png)

:sparkles: Redux-Toolkit, Redux-Saga 연습 페이지입니다. :sparkles:
## :tada: React 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt 선택하면 생성 완료.
## 🛩️ Redux-Toolkit, Redux-aga, Axios 설치
- Redux-Toolkit, Redux-saga 설치 명령어
```bash
npm install redux react-redux @reduxjs/toolkit redux-saga
# or
yarn add redux react-redux @reduxjs/toolkit redux-saga
```

- axios 설치 명령어
```bash
npm install axios
# or
yarn add axios
```

## ✒️ main.tsx, App.tsx, userSlice.ts, store.ts, useTypedSelector.ts, TypeBox.ts 수정 및작성
### :zap: main.tsx
- `react-redux`에서 `Provider` 함수 가져온 후 `store.ts` 파일을 import 한 후 <Provider store={store}></Provider>으로 <App />을 둘러싸면 Redux-Toolkit 사용준비 완료.
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

### :zap: App.tsx
- useDispatch, useSelector를 import 하여 사용한 후 state에 RootState를 타입으로 선언함.
- useEffect를 통해 dispatch 값이 바뀔 때마다 함수가 실행되도록 작성함.
```js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userSlice";
import { RootState } from "./redux/store";

export default function App() {
  const dispatch = useDispatch();
  const { users }: any = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>Redux-toolkit with Redux-saga</h1>
      <div>
        {users.length > 0 &&
          users.map((user: any) =>
            <div key={user.index} style={{textAlign: "center", margin: "0 auto"}}>
              <img src={user.src} alt={user.alt} style={{ display: "block", maxWidth: "300px",  margin: "25px auto", borderRadius: "15px"}} />
              {user.name}
            </div>
          )}
      </div>
    </div>
  );
}
```

## ✒️ api.ts, index.ts, user.ts, store.ts, userSlice.ts 수정 및작성
### :zap: api.ts
- fetch 함수를 통해 json 파일 정보를 가져온 뒤, 성공하면 남자 신발 데이터를. 실패하면 에러 메세지를 남기게 설정.
```js
import axios from "axios";

export const fetchUser = async () => {
    return axios
        .get("https://raw.githubusercontent.com/light9639/Shoe-Store/main/data/Shoes.json")
        .then((res) => res.data.Men)
        .catch((error) => error);
};
```
### :zap: index.ts 
```js
import { takeLatest, all } from "redux-saga/effects";
import { handleGetUser } from "./user";
import { getUser } from "../userSlice";

export function* watcherSaga() {
    yield takeLatest(getUser.type, handleGetUser);
}
```

### :zap: user.ts
```js
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
```

### :zap: store.ts
```js
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
```

## :zap: userSlice.ts
```js
import { createSlice } from "@reduxjs/toolkit";

interface initialType {
    users: string[];
    loading: boolean;
    error: string;
}

const initialState: initialType = {
    users: [],
    loading: false,
    error: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser(state) {
            state.loading = true;
        },
        setUser(state, action) {
            state.users = action.payload;
            state.loading = false;
        },
        failedGetUser(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { getUser, setUser, failedGetUser } = userSlice.actions;

export default userSlice.reducer;
```
