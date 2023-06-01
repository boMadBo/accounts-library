import axios from 'axios';
import Cookies from 'js-cookie';

const getToken = (): string | undefined => Cookies.get('token');
export const instance = axios.create({
  baseURL: 'http://localhost:3013/',
});

instance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
