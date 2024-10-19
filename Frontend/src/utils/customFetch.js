import axios from 'axios';
import queryString from 'query-string';

const axiosClient = {
  application: axios.create({
    baseURL: "https://api.themoviedb.org/3",

    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),

  applicationNoAuth: axios.create({
    baseURL: "https://api.themoviedb.org/3",

    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),

  formData: axios.create({
    baseURL: "https://api.themoviedb.org/3",

    headers: {
      'content-type': 'multipart/form-data',
    },
  }),
};

export default axiosClient;