import { CardMedia, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateVietQRCode } from 'utils/qrCode';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const PaymentQRCode = ({ amount, orderId, label, ...rest }) => {
  const settings = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const [qrContent, setQrContent] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const banking = settings.payment.banking;
      // Validate required fields
      if (!banking.merchantCode || !banking.accountNumber || !banking.accountName) {
        throw new Error('Missing required banking information');
      }

      if (amount < 0) {
        throw new Error('Invalid amount');
      }
      const generateQR = async () => {
        try {
          const qrImage = await generateVietQRCode(
            banking.merchantCode || '970403', // Bank BIN
            banking.accountNumber, // Account number
            banking.accountName, // Account name
            amount, // Amount (optional)
            banking.transferPrefix.replace('(userId)', user?.id) + orderId, // Message (optional)
            banking.bankName
          );
          setQrContent(qrImage);
        } catch (error) {
          console.error('Error generating QR code:', error);
          setError('');
        }
      };
      generateQR();
    } catch (err) {
      setError(err.message);
      console.error('QR Code generation error:', err);
    }
  }, [settings, amount, orderId, user]);

  const handleCheckoutClick = () => {
    if (!error) {
      setOpenDialog(true);
    }
  };
  const handleCheckout = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/checkout', {
        soTien: amount,
        nguoiDung: user?.name,
        goiDangKy: `Mua khóa học: ${orderId}`,
        courseId: orderId
      });
      console.log('handleCheckout/', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (error) {
    return <Typography color="error">Không thể tạo mã QR: {error}</Typography>;
  }

  return (
    <>
      {amount > 0 && (
        <Button variant="contained" color="primary" {...rest} onClick={handleCheckoutClick} disabled={!!error}>
          {label || 'Thanh toán'}
        </Button>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Thanh toán qua chuyển khoản ngân hàng</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 2,
                  p: 2,
                  border: '1px solid #eee',
                  borderRadius: 1
                }}
              >
                <CardMedia component="img" height="260" width="200" image={qrContent} style={{ objectFit: 'contain' }} />
                {/* <QRCodeSVG value={qrContent} size={256} level="M" includeMargin={true} /> */}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Thông tin chuyển khoản:
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography gutterBottom>
                  <strong>Ngân hàng:</strong> {settings.payment.banking.bankName}
                </Typography>
                <Typography gutterBottom>
                  <strong>Số tài khoản:</strong> {settings.payment.banking.accountNumber}
                </Typography>
                <Typography gutterBottom>
                  <strong>Tên TK:</strong> {settings.payment.banking.accountName}
                </Typography>
                <Typography gutterBottom>
                  <strong>Số tiền:</strong>{' '}
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(amount)}
                </Typography>
                <Typography gutterBottom maxWidth="sm">
                  <strong>Nội dung CK:</strong> {settings.payment.banking.transferPrefix.replace('(userId)', user?.id) + orderId}
                </Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Đã Thanh toán
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              * Quét mã QR bằng ứng dụng ngân hàng để tự động điền thông tin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              * Vui lòng chuyển khoản đúng số tiền và nội dung để được kích hoạt tự động
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentQRCode;
