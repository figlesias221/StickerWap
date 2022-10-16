import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import navReducer from './slices/navSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
});

declare global {
  type RootState = ReturnType<typeof rootReducer>;
}

export default rootReducer;
