import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState: User = {
    name:    '',
    photo:   '',
    resume:  '',
    company: {
        name: '',
        role: '',
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { name, photo, resume, company } = action.payload;
            state.name    = name;
            state.photo   = photo;
            state.resume  = resume;
            state.company = company;
        },
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;