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