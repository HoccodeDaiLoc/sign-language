import apiClient from './apiClient'
const adminServices = {
    getUserByPage: async (limit, page) => {
        try {
            const response = await apiClient.get(`/users?role=user&limit=${limit}&page=${page}`);
            if (response.status === 200) {
                return { success: true, response };
            } else {
                return { success: false, error: 'Lỗi xảy ra khi lấy dữ liệu ' };
            }
        } catch (error) {
            console.error("Lỗi xảy ra khi lấy dữ liệu :", error);
            return { success: false, error: "Lỗi xảy ra khi lấy dữ liệu " };
        }
    },
    getUserByEmail: async (userEmail) => {
        try {
            const response = await apiClient.get(`/users?role=user&email=${userEmail}`);
            if (response.status === 200) {
                return { success: true, response };
            } else {
                return { success: false, error: 'Lỗi xảy ra tìm kiếm người dùng' };
            }
        } catch (error) {
            console.error("Lỗi xảy ra tìm kiếm người dùng:", error);
            return { success: false, error: "Lỗi xảy ra tìm kiếm người dùng" };
        }
    },
    addSign: async (data) => {
        try {
            const response = await apiClient.post(`/sign-language`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                return { success: true, response };
            } else {
                return { success: false, error: 'Lỗi xảy ra tìm kiếm người dùng' };
            }
        } catch (error) {
            console.error("Lỗi xảy ra tìm kiếm người dùng:", error);
            return { success: false, error: "Lỗi xảy ra tìm kiếm người dùng" };
        }
    },
    getSign: async (name) => {
        try {
            const response = await apiClient.get(`/sign-language?name=${name}`);
            if (response.status === 200) {
                return { success: true, response };
            } else {
                return { success: false, error: 'Lỗi xảy ra tìm kiếm người dùng' };
            }
        } catch (error) {
            console.error("Lỗi xảy ra tìm kiếm người dùng:", error);
            return { success: false, error: "Lỗi xảy ra tìm kiếm người dùng" };
        }
    },
    getAllSign: async (pageNum, limit) => {
        try {
            const response = await apiClient.get(`/sign-language?page=${pageNum}&limit=${limit}`);
            if (response.status === 200) {
                return { success: true, response };
            } else {
                return { success: false, error: 'Lỗi xảy ra tìm kiếm người dùng' };
            }
        } catch (error) {
            console.error("Lỗi xảy ra tìm kiếm người dùng:", error);
            return { success: false, error: "Lỗi xảy ra tìm kiếm người dùng" };
        }
    },
    deleteSignById: async (id) => {
        try {
            const response = await apiClient.delete(`/sign-language/${id}`);
            if (response.status === 200) {
                return { success: true, response };
            } else {
                return { success: false, error: 'Lỗi xảy ra tìm kiếm người dùng' };
            }
        } catch (error) {
            console.error("Lỗi xảy ra tìm kiếm người dùng:", error);
            return { success: false, error: "Lỗi xảy ra tìm kiếm người dùng" };
        }
    },
}
export default adminServices;