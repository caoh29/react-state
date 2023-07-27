import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserContextState {
    users: User[];
}

const initialState : UserContextState = {
    users: []
};

export const userSlice = createSlice({
    name: 'UserContext',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            !state.users.includes(action.payload) && state.users.push(action.payload);
        },
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;