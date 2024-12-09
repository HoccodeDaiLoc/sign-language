import { createSlice } from '@reduxjs/toolkit'
import { store } from '../utils/store';

const initialState = {
    theme: "light-theme",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
        }
    },
})

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
export const selectCurrentTheme = () => store.getState().theme.theme;