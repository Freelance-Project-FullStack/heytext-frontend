import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react'; // Changed this line
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// CRC16 calculation function
const crc16 = (str) => {
  let crc = 0xffff;
  const bytes = new TextEncoder().encode(str);

  for (const byte of bytes) {
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x0001) {
        crc = (crc >> 1) ^ 0xa001;
      } else {
        crc >>= 1;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

// Format string with proper length padding
const formatField = (id, value, length = null) => {
  const stringValue = value.toString();
  const valueLength = stringValue.length;

  // If length is specified, pad with zeros
  const paddedValue = length ? stringValue.padStart(length, '0') : stringValue;

  // Format: ID (2 digits) + Length (2 digits) + Value
  return `${id}${valueLength.toString().padStart(2, '0')}${paddedValue}`;
};

// eslint-disable-next-line react/prop-types
const PaymentQRCode = ({ amount, orderId, label, ...rest }) => {
  const settings = useSelector((state) => state.settings);
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

      // Build VietQR content following EMV QR Code Specification
      const payload = [
        '00', // Payload Format Indicator
        '02', // Point of Initiation Method
        '01', // Static QR Code

        // Merchant Account Information
        '38', // Consumer Presented Mode
        formatField('00', 'A000000727'), // VietQR Application ID
        formatField('01', banking.merchantCode), // Merchant ID
        formatField('02', banking.accountNumber), // Account Number

        formatField('58', 'VN'), // Country Code
        formatField('59', banking.accountName), // Merchant Name
        formatField('54', Number(amount || 0).toFixed(0)), // Transaction Amount
        formatField('62', `${banking.transferPrefix}${orderId}`) // Additional Data Field
      ].join('');

      // Calculate and append CRC
      const crc = crc16(payload + '6304');
      const qrString = payload + '6304' + crc;

      setQrContent(qrString);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('QR Code generation error:', err);
    }
  }, [settings, amount, orderId]);

  const handleCheckoutClick = () => {
    if (!error) {
      setOpenDialog(true);
    }
  };
  const handleCheckout = () => {};

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
                <QRCodeSVG value={qrContent} size={256} level="M" includeMargin={true} />
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
                <Typography gutterBottom>
                  <strong>Nội dung CK:</strong> {settings.payment.banking.transferPrefix}
                  {orderId}
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
