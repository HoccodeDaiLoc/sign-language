import axios from 'axios';
import Cookies from 'js-cookie';
import { store } from '../utils/store'
import { logOut } from '../features/authSlice';

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
            const originalRequest = error.config; // Save the original request to retry
            console.log(originalRequest);

            if (
                error.response &&
                error.response.status === 400 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    const refreshToken = Cookies.get('refreshToken');
                    const { data } = await axiosClient.post('/get-access-token', {
                        refreshToken: refreshToken,
                    }, {
                        headers: {
                            'x-client-id': stateAuth.user._id,
                        }
                    });
                    console.log("headers", stateAuth.user._id)
                    Cookies.set('accessToken', data.accessToken);
                    axios.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    return axiosClient(originalRequest);
                } catch (err) {
                    // console.log('Error during token refresh', err);
                    // Cookies.remove('accessToken');
                    // Cookies.remove('refreshToken');
                    // store.dispatch(logOut());
                    // window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);


export default axiosClient;
