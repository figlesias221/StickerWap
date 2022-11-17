import axios from 'axios';

import { store } from 'redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { dispatch } = store;

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const headers = {
    Accept: '*/*',
    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
  };
  return { ...config, headers };
});

export const getData = async (endpoint: string, options = {}) => {
  const { data } = await api.get(endpoint, options);
  return data;
};

export default api;
