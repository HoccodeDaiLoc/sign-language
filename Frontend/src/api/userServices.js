import apiClient from './apiClient'
const userServices = {
    updateUser: async (userId, formData) => {
        try {
            const response = await apiClient.patch(`/users/${userId}`, formData);

            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, error: 'Lỗi xảy ra khi cập nhật thông tin' };
            }
        } catch (err) {
            console.error("Error updating user:", err);
            return { success: false, error: "Lỗi xảy ra khi cập nhật thông tin" };
        }
    },

    changeAvatar: async (userId, formData) => {
        try {
            const response = await apiClient.patch(`/users/${userId}/change-avatar`, formData);
            console.log("response", response)
            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, error: 'Lỗi xảy ra khi đổi avatar' };
            }
        } catch (error) {
            console.error("Error changing avatar:", error);
            return { success: false, error: "Lỗi xảy ra khi đổi avatar", };
        }
    },

    uploadVideo: async (formdata) => {
        try {
            const respone = await apiClient.post("/recognition", formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                }
            );
            console.log("respone", respone)
            if (respone.status === 200) {
                return respone.data
            }

        } catch (error) {
            console.log("err uploadVideo> >>", error)
            return { success: false, error: "Lỗi xảy ra khi tải lên video" }
        }
    }
}
export default userServices;