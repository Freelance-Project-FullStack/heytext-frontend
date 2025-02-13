import axios from 'axios';

// Constants
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_LOADING = 'SET_LOADING';

const API_URL = 'http://localhost:3000/api';

// Initial state
export const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
  token: localStorage.getItem('token')
};

// Reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        loading: false
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        loading: false
      };

    case REGISTER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        loading: false
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

// Actions
export const authService = {
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  login: async (dispatch, credentials) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: CLEAR_ERROR });

      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token, user } = response.data;

      authService.setAuthToken(token);
      
      dispatch({
        type: LOGIN,
        payload: { token, user }
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response?.data?.message || 'Đăng nhập thất bại'
      });
      throw error;
    }
  },

  register: async (dispatch, userData) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: CLEAR_ERROR });

      const response = await axios.post(`${API_URL}/signup`, userData);
      const { token, user } = response.data;

      authService.setAuthToken(token);

      dispatch({
        type: REGISTER,
        payload: { token, user }
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response?.data?.message || 'Đăng ký thất bại'
      });
      throw error;
    }
  },

  logout: (dispatch) => {
    authService.setAuthToken(null);
    dispatch({ type: LOGOUT });
  },

  loadUser: async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.setAuthToken(token);
      try {
        const response = await axios.get(`${API_URL}/me`);
        dispatch({
          type: LOGIN,
          payload: { token, user: response.data }
        });
      } catch (error) {
        authService.setAuthToken(null);
        dispatch({ type: LOGOUT });
      }
    }
  },

  clearError: (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  }
};

export default reducer;
