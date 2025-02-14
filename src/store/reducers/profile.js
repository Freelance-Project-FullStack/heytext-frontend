import { createSlice } from '@reduxjs/toolkit';

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
  ]
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    logout: (state) => {
      state.user = null;
      state.fontDownloads = [];
      state.courses = [];
      state.payments = [];
    }
  }
});

export const { updateProfile, logout } = profileSlice.actions;
export default profileSlice.reducer;
