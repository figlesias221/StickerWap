/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserTokens {
  accessToken: string;
}
export interface AuthSliceState {
  user: UserTokens;
  data: any;
}

const authInitialState: AuthSliceState = {
  user: {
    accessToken: '',
  },
  data: {},
};

const auth = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    loginSuccess(state, { payload }: PayloadAction<UserTokens>) {
      state.user = payload;
    },
    signOut(state) {
      state.user = {
        accessToken: '',
      };
      state.data = {};
    },
    setUserData(state, { payload }: PayloadAction<any>) {
      state.data = payload;
    },
  },
});

export const { loginSuccess, signOut, setUserData } = auth.actions;

export default auth.reducer;
