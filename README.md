# π οΈ Redux-Toolkit, Redux-Saga μ°μ΅ νμ΄μ§μλλ€.
:octocat: https://light9639.github.io/Redux-Toolkit-Saga/

![light9639 github io_Redux-Toolkit-Saga_](https://user-images.githubusercontent.com/95972251/212889474-e29233b6-69df-4417-b04f-0f8307527637.png)

:sparkles: Redux-Toolkit, Redux-Saga μ°μ΅ νμ΄μ§μλλ€. :sparkles:
## :tada: React μμ±
- React μμ±
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- viteλ₯Ό μ΄μ©νμ¬ νλ‘μ νΈλ₯Ό μμ±νλ €λ©΄
```bash
npm create vite@latest
# or
yarn create vite
```
- ν°λ―Έλμμ μ€ν ν νλ‘μ νΈ μ΄λ¦ λ§λ  ν React μ ν, Typescirpt μ ννλ©΄ μμ± μλ£.
## π©οΈ Redux-Toolkit, Redux-aga, Axios μ€μΉ
- Redux-Toolkit, Redux-saga μ€μΉ λͺλ Ήμ΄
```bash
npm install redux react-redux @reduxjs/toolkit redux-saga
# or
yarn add redux react-redux @reduxjs/toolkit redux-saga
```

- axios μ€μΉ λͺλ Ήμ΄
```bash
npm install axios
# or
yarn add axios
```

## βοΈ main.tsx, App.tsx, userSlice.ts, store.ts, useTypedSelector.ts, TypeBox.ts μμ  λ°μμ±
### :zap: main.tsx
- `react-redux`μμ `Provider` ν¨μ κ°μ Έμ¨ ν `store.ts` νμΌμ `import` ν ν `<Provider store={store}></Provider>μΌλ‘ <App />`μ λλ¬μΈλ©΄ `Redux-Toolkit` μ¬μ©μ€λΉ μλ£.
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
- `useDispatch`, `useSelector`λ₯Ό `import` νμ¬ μ¬μ©ν ν `state`μ `RootState`λ₯Ό νμμΌλ‘ μ μΈν¨.
- `useEffect`λ₯Ό ν΅ν΄ `dispatch` κ°μ΄ λ°λ λλ§λ€ ν¨μκ° μ€νλλλ‘ μμ±ν¨.
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

## βοΈ api.ts, index.ts, user.ts, store.ts, userSlice.ts μμ  λ°μμ±
### :zap: api.ts
- `fetch` ν¨μλ₯Ό ν΅ν΄ `json` νμΌ μ λ³΄λ₯Ό κ°μ Έμ¨ λ€, μ±κ³΅νλ©΄ λ¨μ μ λ° λ°μ΄ν°λ₯Ό. μ€ν¨νλ©΄ μλ¬ λ©μΈμ§λ₯Ό λ¨κΈ°κ² μ€μ .
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
