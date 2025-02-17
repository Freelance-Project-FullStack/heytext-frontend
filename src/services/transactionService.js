import axios from 'axios';

export const fetchTransactions = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/transactions`);
  return response.data;
};

export const createTransaction = async (body) => {
  const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/transactions`, body);
  return response.data;
};

export const approveTransaction = async (txId) => {
  const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/transactions/${txId}`, { trangThai: 'approved' });
  return response.data;
};

export const rejectTransaction = async (txId, reason) => {
  const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/transactions/${txId}`, {
    trangThai: 'eject',
    reason
  });
  return response.data;
};
