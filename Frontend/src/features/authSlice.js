import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { REHYDRATE } from "redux-persist";
import { store } from '../utils/store';

const initialState = {
    user: null, 
    isAuthenticated: false,
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
        },
        logOut: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        },
        updateUserInfo(state, action) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }; // Cập nhật thông tin user
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            if (state.user) {
                state.isAuthenticated = true;
            }
        });
    }
});

export const { login, logOut, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = () => store.getState().auth.user;
export const selectCurrentAccessToken = () => Cookies.get("accessToken");
