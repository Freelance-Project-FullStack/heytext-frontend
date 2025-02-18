import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import settingsReducer from './reducers/settings';
import fontReducer from './reducers/fontSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    settings: settingsReducer,
    fonts: fontReducer
  }
});

export default store;
