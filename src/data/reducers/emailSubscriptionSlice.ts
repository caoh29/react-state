import { createSlice } from '@reduxjs/toolkit';

interface EmailSubscriptionState {
    isSubscribed: boolean;
    subscribedEmails: string[];
}

const initialState : EmailSubscriptionState = {
    isSubscribed: false,
    subscribedEmails: []
};

export const emailSubscriptionSlice = createSlice({
    name: 'emailSubscription',
    initialState,
    reducers: {
        subscribe: (state, action) => {
            state.subscribedEmails.push(action.payload);
        },
        unsubscribe: (state, action) => {
            const index = state.subscribedEmails.findIndex((item) => item === action.payload);
            if (index !== -1) {
                state.subscribedEmails.splice(index, 1);
            }
        },
        checkSubscription: (state, action) => {
            state.subscribedEmails.includes(action.payload) ? state.isSubscribed = true : state.isSubscribed = false;
        }
    },
});

export const { subscribe, unsubscribe, checkSubscription } = emailSubscriptionSlice.actions;

export default emailSubscriptionSlice.reducer;