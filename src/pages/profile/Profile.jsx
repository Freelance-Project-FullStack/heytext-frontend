import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/auth-reducer/useAuth';
import { authService } from 'contexts/auth-reducer/auth';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  EditOutlined,
  UserOutlined,
  LockOutlined,
  HistoryOutlined,
  CrownOutlined,
  FontColorsOutlined,
  BookOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const Profile = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    name: state.user?.name || 'John Doe',
    email: state.user?.email || 'john@example.com',
    avatar: state.user?.avatar || '/path/to/avatar.jpg',
    subscription: {
      plan: state.user?.subscription?.plan || 'Free',
      validUntil: state.user?.subscription?.validUntil || '2024-12-31',
      features: [
        'Không giới hạn download font',
        'Truy cập AI Assistant',
        'Truy cập khóa học premium'
      ]
    }
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleLogout = () => {
    authService.logout(dispatch);
    navigate('/login');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={profile.avatar}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {profile.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {profile.email}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditOutlined />}
                onClick={() => setOpenEdit(true)}
                sx={{ mt: 2 }}
              >
                Chỉnh sửa thông tin
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Info */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CrownOutlined style={{ fontSize: 24, marginRight: 8 }} />
                <Typography variant="h6">
                  Gói {profile.subscription.plan}
                </Typography>
              </Box>
              <Typography color="text.secondary" gutterBottom>
                Hiệu lực đến: {profile.subscription.validUntil}
              </Typography>
              <List dense>
                {profile.subscription.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{ mt: 2 }}
              >
                Gia hạn gói Premium
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={handleLogout}
                startIcon={<LogoutOutlined />}
                sx={{ mt: 2 }}
              >
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
                <Tab icon={<FontColorsOutlined />} label="Font Downloads" />
                <Tab icon={<BookOutlined />} label="Khóa học" />
                <Tab icon={<HistoryOutlined />} label="Lịch sử thanh toán" />
              </Tabs>

              {/* Font Downloads History */}
              {currentTab === 0 && (
                <List>
                  {fontDownloads.map((item) => (
                    <ListItem key={item.id} divider>
                      <ListItemText
                        primary={item.fontName}
                        secondary={new Date(item.downloadDate).toLocaleDateString()}
                      />
                      <Chip label={item.type} color={item.type === 'Premium' ? 'primary' : 'default'} />
                    </ListItem>
                  ))}
                </List>
              )}

              {/* Courses */}
              {currentTab === 1 && (
                <List>
                  {courses.map((course) => (
                    <ListItem key={course.id} divider>
                      <ListItemText
                        primary={course.name}
                        secondary={`Tiến độ: ${course.progress}%`}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        href={`/courses/${course.id}`}
                      >
                        Tiếp tục học
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}

              {/* Payment History */}
              {currentTab === 2 && (
                <List>
                  {payments.map((payment) => (
                    <ListItem key={payment.id} divider>
                      <ListItemText
                        primary={payment.description}
                        secondary={new Date(payment.date).toLocaleDateString()}
                      />
                      <Typography color="primary" variant="h6">
                        {payment.amount.toLocaleString()}đ
                      </Typography>
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
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Họ tên"
              value={profile.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={profile.email}
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Thay đổi ảnh đại diện
              <input type="file" hidden accept="image/*" />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
          <Button variant="contained">Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPassword} onClose={() => setOpenPassword(false)}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Mật khẩu hiện tại"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Mật khẩu mới"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Xác nhận mật khẩu mới"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPassword(false)}>Hủy</Button>
          <Button variant="contained">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Mock data
const fontDownloads = [
  {
    id: 1,
    fontName: 'Arial Pro',
    downloadDate: '2024-03-15',
    type: 'Premium'
  },
  {
    id: 2,
    fontName: 'Helvetica Now',
    downloadDate: '2024-03-14',
    type: 'Premium'
  },
  {
    id: 3,
    fontName: 'Open Sans',
    downloadDate: '2024-03-13',
    type: 'Free'
  }
];

const courses = [
  {
    id: 1,
    name: 'Typography Masterclass',
    progress: 75,
    enrollDate: '2024-02-01'
  },
  {
    id: 2,
    name: 'Font Design Basic',
    progress: 30,
    enrollDate: '2024-03-01'
  }
];

const payments = [
  {
    id: 1,
    description: 'Gói Premium - 1 năm',
    amount: 990000,
    date: '2024-01-01'
  },
  {
    id: 2,
    description: 'Typography Masterclass',
    amount: 499000,
    date: '2024-02-01'
  }
];

export default Profile; 