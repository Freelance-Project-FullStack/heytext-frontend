import axios from 'utils/axios';

export const fetchTransactions = async () => {
  const response = await axios.get(`/transaction`);
  return response.data;
};

export const createTransaction = async (body) => {
  const response = await axios.post(`/transaction`, body);
  return response.data;
};

export const approveTransaction = async (txId) => {
  const response = await axios.put(`/transaction/${txId}`, { trangThai: 'success' });
  return response.data;
};

export const rejectTransaction = async (txId, reason) => {
  const response = await axios.put(`/transaction/${txId}`, {
    trangThai: 'failed',
    reason
  });
  return response.data;
};
