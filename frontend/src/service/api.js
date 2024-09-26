import axios from 'axios';
import { appApiUrl } from '../environment/config';

const api = axios.create({
  baseURL: appApiUrl,
});

api.interceptors.request.use(
  (config) => {
    // You can add common request headers or behavior here.
    // For example, you can add an authentication token to the headers.
    // const token = 'your_auth_token';
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // You can handle common response behaviors here.
    return response;
  },
  (error) => {
    // You can handle errors globally here.
    return Promise.reject(error);
  }
);

export default api;
