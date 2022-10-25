import axios from 'axios';

import { signOut } from 'redux/slices/authSlice';
import { store } from 'redux/store';

const { dispatch } = store;

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(async config => {
//   const headers = {
//     Accept: '*/*',
//     'access-token': await AsyncStorage.getItem('accessToken'),
//   };
//   return { ...config, headers };
// });

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      dispatch(signOut());
    }
    return error;
  },
);

export const getData = async (endpoint: string, options = {}) => {
  const { data } = await api.get(endpoint, options);
  return data;
};

export default api;
