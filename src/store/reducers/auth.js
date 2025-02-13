import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
  token: localStorage.getItem('token')
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
      state.error = null;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('token');
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Actions
export const { setLoading, loginSuccess, logoutSuccess, setError } = authSlice.actions;

// Thunk Actions
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    const { token, user } = response.data;

    // Set token in axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch(loginSuccess({ token, user }));
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

export default authSlice.reducer;
