/* eslint-disable object-curly-newline */
/* eslint-disable no-unsafe-optional-chaining */
import api, { refreshApi } from '../api';
import { store } from '../redux/store';
import { loginSuccess, signOut } from '../redux/slices/authSlice';
import i18n from '../translations';
import { setCustomApiError } from '../utils/utilities';

interface LoginParams {
  username: string;
  password: string;
}

interface RefreshParams {
  refreshToken: string;
}

const { dispatch } = store;

// LOGIN
export const login = (params: LoginParams) =>
  api
    .post('/users/me/login', params) // change route to match backend API
    .then(res => {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        id_token: idToken,
        expires_at: expiresAt,
      } = res?.data.with;

      dispatch(
        loginSuccess({
          accessToken,
          refreshToken,
          idToken,
          expiresAt,
        }),
      );

      // Optional: user data fetch after login
      //   return getData();
    })
    .catch(e => {
      const { with: status } = e?.response?.data || {};

      if (status === 401) throw e;
      throw setCustomApiError(e, i18n.t('something_wrong'));
    });

// REFRESH TOKEN
export const refreshSession = (params: RefreshParams) =>
  // NOTE: We might need to change this route and response management based on the API we are using
  refreshApi
    .post('/users/me/refreshToken', params)
    .then(res => {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        id_token: idToken,
        expires_at: expiresAt,
      } = res?.data.with;

      dispatch(loginSuccess({ accessToken, refreshToken, idToken, expiresAt }));

      return res;
    })
    .catch(e => {
      const { with: status } = e?.response?.data || {};

      if (status !== 200 && status !== 204) {
        dispatch(signOut());
      }

      throw setCustomApiError(e, i18n.t('something_wrong'));
    });
