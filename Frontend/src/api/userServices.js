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
            return { success: false, error: "Error occurred during logout" }
        }
    }
}
export default userServices;