import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { IssuesCloseOutlined, StopOutlined } from '@ant-design/icons';
import { fetchTransactions, approveTransaction, rejectTransaction } from 'services/transactionService';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTx, setSelectedTx] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactions();
      setTransactions(data || []);
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApprove = async (txId) => {
    try {
      // Gọi API để approve transaction
      await approveTransaction(txId);
      // Refresh danh sách
      const data = await fetchTransactions();
      setTransactions(data || []);
    } catch (error) {
      console.error('Error approving transaction:', error);
    }
  };

  const handleReject = async () => {
    try {
      // Gọi API để reject transaction
      await rejectTransaction(selectedTx._id, rejectReason);
      setOpenDialog(false);
      setRejectReason('');
      setSelectedTx(null);
      // Refresh danh sách
      const data = await fetchTransactions();
      setTransactions(data || []);
    } catch (error) {
      console.error('Error rejecting transaction:', error);
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', label: 'Chờ xác nhận' },
      success: { color: 'success', label: 'Đã xác nhận' },
      failed: { color: 'error', label: 'Đã từ chối' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Chip label={config.label} color={config.color} />;
  };

  return (
    <Card>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Lịch sử giao dịch
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Mã giao dịch</TableCell>
                <TableCell>Người dùng</TableCell>
                <TableCell>Gói đăng ký</TableCell>
                <TableCell>Số tiền</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tx) => (
                <TableRow key={tx._id + tx.maGiaoDich}>
                  <TableCell>{tx._id}</TableCell>
                  <TableCell>{tx.maGiaoDich}</TableCell>
                  <TableCell>{tx.nguoiDung}</TableCell>
                  <TableCell>{tx.nguoiDung}</TableCell>
                  <TableCell>{tx.soTien.toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell>{new Date(tx.ngayTao).toLocaleString('vi-VN')}</TableCell>
                  <TableCell>{getStatusChip(tx.trangThai)}</TableCell>
                  <TableCell>
                    {tx.trangThai === 'pending' && (
                      <>
                        <IconButton color="success" onClick={() => handleApprove(tx._id)} title="Xác nhận">
                          <IssuesCloseOutlined />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelectedTx(tx);
                            setOpenDialog(true);
                          }}
                          title="Từ chối"
                        >
                          <StopOutlined />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={transactions.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng mỗi trang"
        />
      </Box>

      {/* Dialog xác nhận từ chối */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Từ chối giao dịch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Lý do từ chối"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleReject} color="error">
            Xác nhận từ chối
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TransactionHistory;
