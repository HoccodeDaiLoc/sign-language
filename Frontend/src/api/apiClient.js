import axios from 'axios';
import Cookies from 'js-cookie';

// Tạo instance của Axios
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
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refreshToken');
                const { data } = await axios.post('/refresh', {
                    token: refreshToken,
                });
                Cookies.set('accessToken', data.accessToken);
                axios.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
                return axiosClient(originalRequest);
            } catch (err) {
                console.error('Refresh token failed:', err);
                // Xử lý logout
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
