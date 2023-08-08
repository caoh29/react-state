import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { server } from '../../mocks/server';

import userCardReducer, { fetchUser } from './userCardSlice';

describe('userCardSlice', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    let store : any;

    beforeEach(() => {
        // Create a Redux store with the reducer
        store = configureStore({
        reducer: {
            userCard: userCardReducer,
        },
        });
    });

    test('should handle fetchUser.fulfilled', async () => {
        await store.dispatch(fetchUser('/community/userPage1'));
        const state = store.getState();
        expect(state.userCard.user).toEqual({
            id: 'userPage1',
            name: 'John Smith',
            photo: 'https://randomuser.me/api/portraits/men/75.jpg',
            resume: 'Lorem Ipsum',
            company: {
                name: 'Company',
                role: 'Developer',
            },
        });
    });

    test('should handle fetchUser.rejected', async () => {
        await store.dispatch(fetchUser('/invalid'));
        const state = store.getState();
        expect(state.userCard.user).toEqual({
            id: '',
            name: '',
            photo: '',
            resume: '',
            company: {
                name: '',
                role: '',
            },
        });
    })
});