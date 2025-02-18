import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchUserProfile } from './profile';

const API_URL = import.meta.env.VITE_APP_URL;

// Thêm hàm kiểm tra token
const checkAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }
  return false;
};

const initialState = {
  isAuthenticated: checkAuthToken(),
  user: null,
  error: null,
  loading: false,
  token: localStorage.getItem('token'),
  role: localStorage.getItem('userRole')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.error = null;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userRole', action.payload.user.role);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    }
  }
});

// Actions
export const { setLoading, loginSuccess, logoutSuccess, setError, setUser, signupSuccess } = authSlice.actions;

// Thêm hàm helper để xác định trang chuyển hướng
export const getRedirectPath = (role) => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'user':
      return '/fonts';
    default:
      return '/fonts';
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    const { token, user } = response.data;

    // Set token in axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch(loginSuccess({ token, user }));
    dispatch(fetchUserProfile());
    return { user, redirectPath: getRedirectPath(user.role) };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Đăng nhập thất bại'));
    throw error;
  }
};

export const signup = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${API_URL}/users/signup`, credentials);
    const { token, user, email, role, name } = response.data;

    // Set token in axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch(signupSuccess({ token, user, email, role, name }));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Login failed'));
    throw error;
  }
};

export const logout = () => (dispatch) => {
  // Remove token from axios headers
  delete axios.defaults.headers.common['Authorization'];
  dispatch(logoutSuccess());
};

// Thêm action để kiểm tra và khôi phục session
export const checkAuthStatus = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logoutSuccess());
    return;
  }

  try {
    // Gọi API để verify token và lấy thông tin user
    const response = await axios.get(`${API_URL}/users/me`);
    dispatch(loginSuccess({ token, user: response.data }));
  } catch (error) {
    // Nếu token không hợp lệ, logout
    dispatch(logoutSuccess());
  }
};

export default authSlice.reducer;
