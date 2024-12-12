import axios from 'axios';
import Cookies from 'js-cookie';
import { store } from '../utils/store'

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/v1/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
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
            const originalRequest = error.config;//lưu lỗi vào request
            console.log(originalRequest)
            if (
                error.response &&
                error.response.status === 400
                && !originalRequest._retry
            ) {
                originalRequest._retry = true;
                try {
                    const refreshToken = Cookies.get('refreshToken');
                    console.log(refreshToken)
                    const { data } = await axiosClient.post('/get-access-token', {
                        refreshToken: refreshToken,
                    });
                    console.log(data)
                    Cookies.set('accessToken', data.accessToken);
                    axios.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
                    return axiosClient(originalRequest);
                }
                catch (err) {
                    console.log('Condition not met', error.response.status, originalRequest._retry);
                    // Xử lý logout
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
