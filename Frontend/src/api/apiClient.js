import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../utils/store";
import { logOut } from "../features/authSlice";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/v1/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const stateAuth = store.getState().auth;
        if (stateAuth.isAuthenticated && stateAuth.user) {
            config.headers["x-client-id"] = stateAuth.user._id;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const stateAuth = store.getState().auth;

        if (stateAuth.user) {
            const originalRequest = error.config;

            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                try {
                    const refreshToken = Cookies.get("refreshToken");
                    if (!refreshToken) {
                        throw new Error("Refresh token not available");
                    }
                    const oldAccessToken = Cookies.get("accessToken");
                    const { data } = await axiosClient.post(
                        "/get-access-token",
                        { refreshToken: refreshToken },
                        {
                            headers: {
                                "x-client-id": stateAuth.user._id,
                                Authorization: oldAccessToken,
                            },
                        }
                    );
                    console.log(data)
                    Cookies.set("accessToken", data.metadata.accessToken);
                    axiosClient.defaults.headers.Authorization = `Bearer ${data.metadata.accessToken}`;
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${data.accessToken}`;

                    return axiosClient(originalRequest);
                } catch (err) {
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    store.dispatch(logOut());
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
