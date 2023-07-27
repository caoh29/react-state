import { createSlice } from '@reduxjs/toolkit';

interface ShowSectionState {
    isVisible: boolean;
}

const initialState : ShowSectionState = {
    isVisible: false
};

export const showSectionSlice = createSlice({
    name: 'showSection',
    initialState,
    reducers: {
        changeVisibility: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { changeVisibility } = showSectionSlice.actions;

export default showSectionSlice.reducer;