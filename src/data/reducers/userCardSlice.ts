import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserCardState {
    user: User;
}

const initialState : UserCardState = {
    user: {
        id: '',
        firstName: '',
        lastName: '',
        avatar: '',
        resume: '',
        position: ''
    }
};

export const fetchUser = createAsyncThunk('fetchUser', async (apiURL : string) => {
    const response = await fetch(apiURL);
    return response.json();
});

export const userCardSlice = createSlice({
    name: 'userCard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                console.log(action);
            })
    }
});

export default userCardSlice.reducer;