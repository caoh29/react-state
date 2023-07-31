import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/usersSlice";
import userCardReducer from "../reducers/userCardSlice";
import sectionReducer from "../reducers/showSectionSlice";
import emailReducer from "../reducers/emailSubscriptionSlice";

const store = configureStore({
    reducer: {
        usersContext: usersReducer,
        userCard: userCardReducer,
        showSection: sectionReducer,
        emailSubscription: emailReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;