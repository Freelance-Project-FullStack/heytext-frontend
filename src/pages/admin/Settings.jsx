import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { SaveOutlined, EyeOutlined, EyeInvisibleOutlined, PayCircleOutlined, AuditOutlined, MailOutlined } from '@ant-design/icons';
import { updatePaymentSettings, updateOpenAISettings, updateEmailSettings } from 'store/reducers/settings';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [currentTab, setCurrentTab] = useState(0);
  const [showPasswords, setShowPasswords] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Form states
  const [paymentForm, setPaymentForm] = useState(settings.payment.vnpay);
  const [openaiForm, setOpenaiForm] = useState(settings.openai);
  const [emailForm, setEmailForm] = useState(settings.emailSettings);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatePaymentSettings({ vnpay: paymentForm }));
      setSnackbar({
        open: true,
        message: 'Cập nhật cấu hình thanh toán thành công',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Lỗi cập nhật cấu hình thanh toán',
        severity: 'error'
      });
    }
  };

  const handleOpenAISubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateOpenAISettings(openaiForm));
      setSnackbar({
        open: true,
        message: 'Cập nhật cấu hình OpenAI thành công',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Lỗi cập nhật cấu hình OpenAI',
        severity: 'error'
      });
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateEmailSettings(emailForm));
      setSnackbar({
        open: true,
        message: 'Cập nhật cấu hình email thành công',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Lỗi cập nhật cấu hình email',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cài đặt hệ thống
      </Typography>

      <Card>
        <CardContent>
          <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab icon={<PayCircleOutlined />} label="Thanh toán" />
            <Tab icon={<AuditOutlined />} label="OpenAI" />
            <Tab icon={<MailOutlined />} label="Email" />
          </Tabs>

          {/* Payment Settings */}
          {currentTab === 0 && (
            <form onSubmit={handlePaymentSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Cấu hình VNPAY
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="TMN Code"
                    value={paymentForm.tmnCode}
                    onChange={(e) => setPaymentForm({ ...paymentForm, tmnCode: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Hash Secret"
                    type={showPasswords.hashSecret ? 'text' : 'password'}
                    value={paymentForm.hashSecret}
                    onChange={(e) => setPaymentForm({ ...paymentForm, hashSecret: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility('hashSecret')}>
                            {showPasswords.hashSecret ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Return URL"
                    value={paymentForm.returnUrl}
                    onChange={(e) => setPaymentForm({ ...paymentForm, returnUrl: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Giá gói Premium (VNĐ)"
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" startIcon={<SaveOutlined />}>
                    Lưu cấu hình thanh toán
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}

          {/* OpenAI Settings */}
          {currentTab === 1 && (
            <form onSubmit={handleOpenAISubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Cấu hình OpenAI
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="API Key"
                    type={showPasswords.apiKey ? 'text' : 'password'}
                    value={openaiForm.apiKey}
                    onChange={(e) => setOpenaiForm({ ...openaiForm, apiKey: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility('apiKey')}>
                            {showPasswords.apiKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Model"
                    value={openaiForm.model}
                    onChange={(e) => setOpenaiForm({ ...openaiForm, model: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Max Tokens"
                    type="number"
                    value={openaiForm.maxTokens}
                    onChange={(e) => setOpenaiForm({ ...openaiForm, maxTokens: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Temperature"
                    type="number"
                    inputProps={{ step: 0.1, min: 0, max: 1 }}
                    value={openaiForm.temperature}
                    onChange={(e) => setOpenaiForm({ ...openaiForm, temperature: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" startIcon={<SaveOutlined />}>
                    Lưu cấu hình OpenAI
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}

          {/* Email Settings */}
          {currentTab === 2 && (
            <form onSubmit={handleEmailSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Cấu hình Email
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Host"
                    value={emailForm.smtpHost}
                    onChange={(e) => setEmailForm({ ...emailForm, smtpHost: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Port"
                    type="number"
                    value={emailForm.smtpPort}
                    onChange={(e) => setEmailForm({ ...emailForm, smtpPort: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP User"
                    value={emailForm.smtpUser}
                    onChange={(e) => setEmailForm({ ...emailForm, smtpUser: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Password"
                    type={showPasswords.smtpPass ? 'text' : 'password'}
                    value={emailForm.smtpPass}
                    onChange={(e) => setEmailForm({ ...emailForm, smtpPass: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => togglePasswordVisibility('smtpPass')}>
                            {showPasswords.smtpPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên người gửi"
                    value={emailForm.senderName}
                    onChange={(e) => setEmailForm({ ...emailForm, senderName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" startIcon={<SaveOutlined />}>
                    Lưu cấu hình email
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </CardContent>
      </Card>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
