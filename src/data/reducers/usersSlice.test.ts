import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { server } from '../../mocks/server';

import usersReducer, { fetchUsers } from './usersSlice';

describe('usersSlice', () => {
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
            usersContext: usersReducer,
        },
        });
    });

    test('should handle fetchUsers.fulfilled', async () => {
        await store.dispatch(fetchUsers('http://localhost:4000/community'));
        const state = store.getState();
        expect(state.usersContext.users).toEqual([
            {
                id: 'userPage1',
                name: 'John Smith',
                photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                resume: 'Lorem Ipsum',
                company: {
                    name: 'Company',
                    role: 'Developer'
                }
            },
            {
                id: 'userPage2',
                name: 'Clark Ken',
                photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                resume: 'Lorem Ipsum si amet',
                company: {
                    name: 'Company2',
                    role: 'Tester'
                }
            },
            {
                id: 'userPage3',
                name: 'Larry Martinez',
                photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                resume: 'Lorem Ipsum si amet no se mas xd',
                company: {
                    name: 'Company3',
                    role: 'Manager'
                }
            },
        ]);
    });

    test('should handle fetchUsers.rejected', async () => {
        await store.dispatch(fetchUsers('http://localhost:4000/invalid'));
        const state = store.getState();
        expect(state.usersContext.users).toEqual([]);
    })
});