import axios from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import store from '../store';
import errors from './errorCodes';

export const errorHandler = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.status === errors.userNotExsist) {
      toast(i18next.t('notify.notAutorized'));
    } else {
      toast(i18next.t('notify.networkError'));
    }
  }
};

const base = axios.create({
  baseURL: '/',
});

base.interceptors.request.use(
  (config) => {
    try {
      const { token } = store.getState().user;
      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
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

base.interceptors.response.use((response) => response, (error) => {
  errorHandler(error);
  return Promise.reject(error);
});

export default base;
