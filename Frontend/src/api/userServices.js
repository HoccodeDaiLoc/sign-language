import apiClient from './apiClient'
const userServices = {
    updateUser: async (userid) => {
        try {
            const respone = await apiClient.patch("/users/", {
                userid
            })
            console.log(respone)
            if (respone.status === 200) {
                return { success: true };
            }
        }
        catch (err) {
            console.log("err update >>>", err)
            return { success: false, error: "Lỗi xảy ra khi cập nhật thông tin" }
        }
    },
    changeAvatar: async (userid, files) => {
        try {
            const respone = await apiClient.patch(`/users/${userid}/change-avatar`, {
                files
            })
            console.log(respone)
            if (respone.status === 200) {
                return { success: true };
            }
        } catch (error) {
            console.log("err update ava>>>", error)
            return { success: false, error: "Lỗi xảy ra khi đổi avatar" }
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