import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';

const initialState = {
  user: {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    subscription: {
      plan: 'Premium',
      validUntil: '2024-12-31',
      features: ['Tải không giới hạn font chữ Premium', 'Truy cập tất cả khóa học', 'Hỗ trợ ưu tiên 24/7', 'Cập nhật font mới hàng tuần']
    }
  },
  fontDownloads: [
    {
      id: 1,
      fontName: 'SVN-Gilroy',
      downloadDate: '2024-03-15',
      type: 'Premium',
      previewText: 'Aa Bb Cc Dd Ee'
    },
    {
      id: 2,
      fontName: 'Inter',
      downloadDate: '2024-03-14',
      type: 'Free',
      previewText: 'Aa Bb Cc Dd Ee'
    },
    {
      id: 3,
      fontName: 'Montserrat',
      downloadDate: '2024-03-13',
      type: 'Premium',
      previewText: 'Aa Bb Cc Dd Ee'
    },
    {
      id: 4,
      fontName: 'Roboto',
      downloadDate: '2024-03-12',
      type: 'Free',
      previewText: 'Aa Bb Cc Dd Ee'
    },
    {
      id: 5,
      fontName: 'SVN-Sofia Pro',
      downloadDate: '2024-03-11',
      type: 'Premium',
      previewText: 'Aa Bb Cc Dd Ee'
    }
  ],
  courses: [
    {
      id: 1,
      name: 'Thiết kế với Adobe Illustrator',
      enrollDate: '2024-02-01',
      progress: 100,
      thumbnail: 'https://example.com/course1.jpg',
      totalLessons: 12,
      completedLessons: 12
    },
    {
      id: 2,
      name: 'Typography cơ bản',
      enrollDate: '2024-02-15',
      progress: 75,
      thumbnail: 'https://example.com/course2.jpg',
      totalLessons: 8,
      completedLessons: 6
    },
    {
      id: 3,
      name: 'Thiết kế Logo chuyên nghiệp',
      enrollDate: '2024-03-01',
      progress: 30,
      thumbnail: 'https://example.com/course3.jpg',
      totalLessons: 10,
      completedLessons: 3
    }
  ],
  payments: [
    {
      id: 1,
      description: 'Gia hạn gói Premium - 1 năm',
      date: '2024-03-15',
      amount: 990000,
      status: 'Thành công',
      transactionId: 'VNP123456789'
    },
    {
      id: 2,
      description: 'Khóa học Typography cơ bản',
      date: '2024-02-15',
      amount: 499000,
      status: 'Thành công',
      transactionId: 'VNP987654321'
    },
    {
      id: 3,
      description: 'Khóa học Thiết kế Logo',
      date: '2024-03-01',
      amount: 699000,
      status: 'Thành công',
      transactionId: 'VNP456789123'
    }
  ],
  loading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProfileData: (state, action) => {
      state.user = action.payload;
    },
    setFontDownloads: (state, action) => {
      state.fontDownloads = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    }
  }
});

export const { setLoading, setError, setProfileData, setFontDownloads, setCourses, setPayments } = profileSlice.actions;

// Thunk actions
export const fetchUserProfile = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/users/profile`);
    dispatch(setProfileData(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch profile'));
  }
};

export const fetchFontDownloads = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/users/font-downloads`);
    dispatch(setFontDownloads(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch font downloads'));
  }
};

export const fetchUserCourses = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/users/courses`);
    dispatch(setCourses(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch courses'));
  }
};

export const fetchPaymentHistory = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/users/payments`);
    dispatch(setPayments(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch payment history'));
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(`/users/profile`, profileData);
    dispatch(setProfileData(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to update profile'));
  }
};

export default profileSlice.reducer;
