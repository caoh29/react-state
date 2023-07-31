import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserContextState {
    users: User[];
}

const initialState : UserContextState = {
    users: []
};

export const fetchUsers = createAsyncThunk('fetchUsers', async (apiURL : string) => {
    const response = await fetch(apiURL);
    return response.json();
});

export const usersSlice = createSlice({
    name: 'UsersContext',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                console.log(action);
            })
    }
});

export default usersSlice.reducer;