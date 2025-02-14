import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
    avatar: '',
    subscription: {
      plan: 'Free',
      validUntil: '',
      features: [
        'Không giới hạn download font',
        'Truy cập AI Assistant',
        'Truy cập khóa học premium'
      ]
    }
  },
  fontDownloads: [],
  courses: [],
  payments: []
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setFontDownloads: (state, action) => {
      state.fontDownloads = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    logout: (state) => {
      return initialState;
    }
  }
});

export const { updateProfile, setFontDownloads, setCourses, setPayments, logout } = profileSlice.actions;
export default profileSlice.reducer; 