/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresAt: string;
}
export interface AuthSliceState {
  user: UserTokens;
}

const authInitialState: AuthSliceState = {
  user: {
    accessToken: '',
    refreshToken: '',
    idToken: '',
    expiresAt: '',
  },
};

const auth = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    loginSuccess(state, { payload }: PayloadAction<UserTokens>) {
      state.user = payload;
    },
    signOut(state) {
      state.user = authInitialState.user;
    },
  },
});

export const { loginSuccess, signOut } = auth.actions;

export default auth.reducer;
