import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import sectionReducer from "../reducers/showSectionSlice";
import emailReducer from "../reducers/emailSubscriptionSlice";

const store = configureStore({
    reducer: {
        userContext: userReducer,
        showSection: sectionReducer,
        emailSubscription: emailReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;