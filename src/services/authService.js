import axios from 'utils/axios';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`/users/login`, {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`/signup`, userData);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export default authService;
