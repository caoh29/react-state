import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";

const store = configureStore({
    reducer: {
        userContext: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;