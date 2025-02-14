import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  }
});

export default store; 