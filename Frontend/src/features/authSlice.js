import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { REHYDRATE } from "redux-persist";
import { store } from '../utils/store';

// Array<number>.reduce(callbackfn: (previousValue: number, currentValue: number,
//      currentIndex: number, array: number[]) => number)

const initialState = {
    user: null, isAuthenticated: false
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            console.log("action", action)
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            Cookies.set("accessToken", action.payload.accessToken);
            Cookies.set('refreshToken', action.payload.refreshToken);
        },
        logOut: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            if (state.user) {
                state.isAuthenticated = true;
            }
        })
    }
})

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = () => store.getState().auth.user;
export const selectCurrentAccessToken = () => Cookies.get("accessToken");
