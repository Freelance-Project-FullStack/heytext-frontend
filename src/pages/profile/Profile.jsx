import { BookOutlined, CrownOutlined, EditOutlined, FontColorsOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
  LinearProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { updateProfile, fetchFontDownloads, fetchUserCourses, fetchPaymentHistory } from 'store/reducers/profile';
import { logout } from 'store/reducers/auth';
import axios from 'utils/axios';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Replace context with Redux selectors
  const { user, fontDownloads, courses, payments } = useSelector((state) => state.profile);

  const [currentTab, setCurrentTab] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  // Update handlers
  const handleProfileUpdate = () => {
    dispatch(updateProfile(editForm));
    setOpenEdit(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleEditFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // Xử lý thanh toán VNPay
  const handlePayment = async () => {
    try {
      const response = await axios.post('/transaction', {
        soTien: 990000,
        nguoiDung: user?.name,
        goiDangKy: 'Gia hạn gói Premium - 1 năm'
      });
      // Chuyển hướng đến trang thanh toán VNPay
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error('Lỗi tạo thanh toán:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Cập nhật lại nội dung Dialog chỉnh sửa
  const editDialogContent = (
    <DialogContent>
      <Box sx={{ pt: 2 }}>
        <TextField fullWidth label="Họ tên" name="name" value={editForm.name} onChange={handleEditFormChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Số điện thoại" name="phone" value={editForm.phone} onChange={handleEditFormChange} sx={{ mb: 2 }} />
      </Box>
    </DialogContent>
  );

  useEffect(() => {
    dispatch(fetchFontDownloads());
    dispatch(fetchUserCourses());
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar src={user?.avatar} sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user?.phone}
              </Typography>
              <Button variant="outlined" startIcon={<EditOutlined />} onClick={() => setOpenEdit(true)} sx={{ mt: 2 }}>
                Chỉnh sửa thông tin
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Info */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CrownOutlined style={{ fontSize: 24, marginRight: 8 }} />
                <Typography variant="h6">Gói {user?.subscription?.plan || 'Miễn phí'}</Typography>
              </Box>
              {user?.subscription?.validUntil && (
                <Typography color="text.secondary" gutterBottom>
                  Hiệu lực đến: {new Date(user.subscription.validUntil).toLocaleDateString('vi-VN')}
                </Typography>
              )}
              <List dense>
                {user?.subscription?.features?.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth color="primary" onClick={() => setOpenPayment(true)} sx={{ mt: 2 }}>
                Gia hạn gói Premium
              </Button>
              <Button variant="contained" fullWidth color="error" onClick={handleLogout} startIcon={<LogoutOutlined />} sx={{ mt: 2 }}>
                Đăng xuất
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Tabs */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab icon={<FontColorsOutlined />} label="Font chữ của tôi" />
                <Tab icon={<BookOutlined />} label="Khóa học" />
                <Tab icon={<HistoryOutlined />} label="Lịch sử thanh toán" />
              </Tabs>

              {/* Font Downloads History */}
              {currentTab === 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {fontDownloads.map((font) => (
                    <Grid item xs={12} sm={6} md={4} key={font.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {font.fontName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tải về: {new Date(font.downloadDate).toLocaleDateString('vi-VN')}
                          </Typography>
                          <Chip label={font.type} color={font.type === 'Premium' ? 'primary' : 'default'} size="small" sx={{ mt: 1 }} />
                          <Typography
                            variant="body1"
                            sx={{
                              mt: 2,
                              fontFamily: font.fontName,
                              fontSize: '1.2rem'
                            }}
                          >
                            Aa Bb Cc Dd Ee
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Courses */}
              {currentTab === 1 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {courses.map((course) => (
                    <Grid item xs={12} key={course.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h6">{course.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Ngày đăng ký: {new Date(course.enrollDate).toLocaleDateString('vi-VN')}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                <LinearProgress variant="determinate" value={course.progress} sx={{ height: 8, borderRadius: 5 }} />
                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                  Tiến độ: {course.progress}%
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              {course.progress === 100 ? (
                                <Chip label="Đã hoàn thành" color="success" />
                              ) : (
                                <Button variant="contained" size="small" href={`/courses/${course.id}`}>
                                  Tiếp tục học
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Payment History */}
              {currentTab === 2 && (
                <List>
                  {payments.map((payment) => (
                    <ListItem
                      key={payment.id}
                      divider
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 2
                      }}
                    >
                      <Box flex={1}>
                        <Typography variant="subtitle1" component="div">
                          {payment.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ngày: {new Date(payment.date).toLocaleDateString('vi-VN')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mã giao dịch: {payment.transactionId}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="primary" variant="h6" sx={{ fontWeight: 'bold' }}>
                          {payment.amount.toLocaleString('vi-VN')}đ
                        </Typography>
                        <Chip label={payment.status} color={payment.status === 'Thành công' ? 'success' : 'error'} size="small" />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        {editDialogContent}
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleProfileUpdate}>
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={openPayment} onClose={() => setOpenPayment(false)}>
        <DialogTitle>Gia hạn gói Premium</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Gói Premium - 1 năm
            </Typography>
            <Typography variant="body1" gutterBottom>
              Giá: 990.000đ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              * Thanh toán qua cổng VNPAY
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPayment(false)}>Hủy</Button>
          <Button variant="contained" onClick={handlePayment}>
            Thanh toán
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
