import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Array<number>.reduce(callbackfn: (previousValue: number, currentValue: number,
//      currentIndex: number, array: number[]) => number)

const initialState = {
    user: null, isAuthenticated: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            Cookies.set("accessToken", action.payload.accessToken);
            Cookies.set('refreshToken', action.payload.refreshToken);
            console.log("action", action)
        },
        logOut: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        }
    }
})

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentAccessToken = () => Cookies.get("accessToken");
