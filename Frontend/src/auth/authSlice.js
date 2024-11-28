import { createSlice } from '@reduxjs/toolkit';
// Array<number>.reduce(callbackfn: (previousValue: number, currentValue: number,
//      currentIndex: number, array: number[]) => number)
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null, token: null, isAuthenticated: false,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.isAuthenticated = true;

        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
