import axiosClient from "../utils/customFetch";

const locationAPI = {
    getProvinces: () => {
        const url = 'https://esgoo.net/api-tinhthanh/1/0.htm';
        return axiosClient.applicationNoAuth.get(url);
    },
};

export default locationAPI;