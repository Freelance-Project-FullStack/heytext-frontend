import axios from 'axios';

export const fetchTransactions = async () => {
  const response = await axios.get('/api/admin/transactions');
  return response.data;
};

export const approveTransaction = async (txId) => {
  const response = await axios.post(`/api/admin/transactions/${txId}/approve`);
  return response.data;
};

export const rejectTransaction = async (txId, reason) => {
  const response = await axios.post(`/api/admin/transactions/${txId}/reject`, {
    reason
  });
  return response.data;
};
