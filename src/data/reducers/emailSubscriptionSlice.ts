import { createSlice } from '@reduxjs/toolkit';

interface EmailSubscriptionState {
    isSubscribed: boolean;
}

const initialState : EmailSubscriptionState = {
    isSubscribed: false
};

export const emailSubscriptionSlice = createSlice({
    name: 'emailSubscription',
    initialState,
    reducers: {
        subscribe: (state) => {
            state.isSubscribed = true;
        },
        unsubscribe: (state) => {
            state.isSubscribed = false;
        },
    },
});

export const { subscribe, unsubscribe } = emailSubscriptionSlice.actions;

export default emailSubscriptionSlice.reducer;