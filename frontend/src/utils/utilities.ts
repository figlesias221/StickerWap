/* eslint-disable operator-linebreak */
/* eslint-disable prefer-regex-literals */
import { AxiosError } from 'axios';

export const maskPhone = (value: string) => {
  let res = value;
  const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  if (x) {
    res = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
  }
  return res;
};

export const unmask = (value: string) => {
  const res = value.replace(/\D/g, '');
  return res;
};

export const passValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
);

export const passwordRule =
  'Passwords must be at least eight characters including one uppercase letter, one number, and one special character.';

export const emailValidation = new RegExp(
  /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
);

/*
  Returns new AxiosError object with custom message `m` set
  in the `e.response.data.because` property
*/
export const setCustomApiError = (e: AxiosError, m: string) => {
  const newError: AxiosError = { ...e };
  if (e?.response?.data) {
    newError.response = {
      ...e.response,
      data: { ...e.response.data, because: m },
    };
  }
  return newError;
};
