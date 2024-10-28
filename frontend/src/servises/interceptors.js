import axios from 'axios';
import store from '../store';

const base = axios.create({
  baseURL: '/',
});

base.interceptors.request.use(
  (config) => {
    try {
      const { token } = store.getState().user;
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  (error) => {
    Promise.reject(error);
  },
);

export default base;
