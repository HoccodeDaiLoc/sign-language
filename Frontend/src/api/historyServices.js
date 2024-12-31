import axiosClient from './apiClient'

const historyServices = {
    getUploadedHistory: async (userId, page, limit, options) => {
        try {
            const response = await axiosClient.get(`/recognition-history/${userId}?page=${page}&limit=${limit}`, { options });
            if (response.status === 200) {
                return { success: true, response };
            } else {
                return { success: false, error: 'Lỗi xảy ra khi tải lịch sử' };
            }
        }
        catch (error) {
            return { success: false, error: 'Lỗi xảy ra khi tải lịch sử' };
        }
    }
}
export default historyServices;