// authService.js
import apiClient from "./apiClient";
import { logOut, login } from "../features/authSlice";

const authServices = {
    login: async (credentials, dispatch) => {
        try {
            const { email, password } = credentials;
            const response = await apiClient.post("/login", { email, password });
            if (response.status === 200) {
                const { token, user } = response.data.metadata;
                const { accessToken, refreshToken } = token;
                dispatch(login({ accessToken, refreshToken, user }));
                return { success: true, user };
            }
        } catch (err) {
            const errorResponse = {};
            if (!err?.response) {
                errorResponse.message = "No Server Response";
            } else if (err.response.status === 400) {
                errorResponse.message = "Missing Email or Password";
            } else if (err.response.status === 401) {
                errorResponse.message = "Unauthorized";
            } else {
                errorResponse.message = "Login Failed";
            }
            return { success: false, error: errorResponse.message };
        }
    },
    logOut: async (dispatch) => {
        try {
            const response = await apiClient.post("/logout");
            if (response.status === 200) {
                dispatch(logOut());
                return { success: true };
            } else {
                console.log("Logout API failed with status", response.status);
                return { success: false, error: "API failed" };
            }
        } catch (error) {
            console.log("Error during logout:", error);
            return { success: false, error: "Error occurred during logout" }
        }
    }
};

export default authServices;
