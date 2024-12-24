import apiClient from './apiClient'
const adminServices = {
    getAllUser: async (num) => {
        try {
            const response = await apiClient.get(`/users?role=user&limit=${num}`);
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
    getUserById: async (userId) => {
        try {
            const response = await apiClient.get(`/users/${userId}`);
            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, error: 'Lỗi xảy ra tìm kiếm người dùng' };
            }
        } catch (error) {
            console.error("Lỗi xảy ra tìm kiếm người dùng:", error);
            return { success: false, error: "Lỗi xảy ra tìm kiếm người dùng" };
        }
    }
}
export default adminServices;