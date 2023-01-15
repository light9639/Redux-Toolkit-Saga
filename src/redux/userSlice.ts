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
