import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import navReducer from './slices/navSlice';
import collectionReducer from './slices/collectionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
  collection: collectionReducer,
});

declare global {
  type RootState = ReturnType<typeof rootReducer>;
}

export default rootReducer;
