import axios from 'axios';
import Config from 'react-native-config';

import { refreshSession } from '../operations/auth';
import { store } from '../redux/store';
import { signOut } from '../redux/slices/authSlice';
import i18n from '../translations';

const { dispatch } = store;

const FORBIDDEN_STATUS = 403;

export const { BASE_URL } = Config;

export const CONTENT_TYPE = {
  Accept: 'application/json',
};

export const HOST = {
  Host: BASE_URL,
};

const api = axios.create({
  baseURL: HOST.Host,
  headers: CONTENT_TYPE,
});

// Separate api object that has no interceptors
export const refreshApi = axios.create({
  baseURL: HOST.Host,
  headers: CONTENT_TYPE,
});

export const setApiInterceptors = () => {
  api.interceptors.request.use(async req => {
    const {
      auth: {
        user: { expiresAt, refreshToken },
      },
      nav: { isLogged },
    } = store.getState();
    // If the token has expired or is about to expire, refresh it
    if (isLogged && refreshToken && +expiresAt < Date.now() / 1000) {
      await refreshSession({ refreshToken });
    }
    const {
      user: { accessToken },
    } = store.getState().auth;
    if (isLogged && accessToken) {
      // Updates Authorization header with refreshed token
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return req;
  });

  api.interceptors.response.use(
    res => res,
    async error => {
      const {
        nav: { isLogged },
      } = store.getState();
      // NOTE: We might have to check this functionality based on the API we are using
      // If the access is forbidden, logout the user
      if (isLogged && error?.response?.status === FORBIDDEN_STATUS) {
        dispatch(signOut(i18n.t('inactivity_logout')));
      }
      throw error;
    },
  );
};

export default api;
