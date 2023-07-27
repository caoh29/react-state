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
    const { data } = await response.json();
    return data;
});

export const userSlice = createSlice({
    name: 'UserContext',
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

export default userSlice.reducer;