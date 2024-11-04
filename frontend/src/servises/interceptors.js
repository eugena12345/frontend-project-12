import axios from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import store from '../store';
import errors from './errorCodes';

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

export const errorHandler = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.status === errors.userNotExsist) {
      toast(i18next.t('notify.notAutorized'));
    } else {
      toast(i18next.t('notify.networkError'));
    }
  }
};

export default base;
