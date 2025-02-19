import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  SearchOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import PaymentQRCode from 'components/payment/PaymentQRCode';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader';

const CourseList = () => {
  const { user } = useSelector((state) => state.profile);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [openCourse, setOpenCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/courses`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === 'success') {
          setCourses(data.result.data);
        } else {
          throw new Error(data.message || 'Không thể tải danh sách khóa học');
        }
      } catch (error) {
        console.error('Lỗi khi tải khóa học:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterCourses = courses.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handlePurchase = async (course) => {
    try {
      // Gọi API tạo đơn hàng VNPay
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          soTien: course.price,
          nguoiDung: user.name,
          goiDangKy: `Mua khóa học: ${course.id}`,
          courseId: course.id
        })
      });

      const data = await response.json();

      // Chuyển hướng đến trang thanh toán VNPay
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };
  if (loading) return <Loader />;
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Tìm kiếm khóa học"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
          sx={{ mb: 2 }}
        />
      </Box>
      {error && (
        <Typography gutterBottom variant="h2">
          {error}
        </Typography>
      )}
      <Grid container spacing={3}>
        {filterCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card>
              <CardMedia component="img" height="140" image={course.image} alt={course.name} />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={course.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({course.rating || 0})
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <UserOutlined style={{ marginRight: 4 }} />
                    {course.students || 100} học viên
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {course.duration || 1}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {course.price.toLocaleString()}đ
                  </Typography>

                </Box>
                <Box sx={{ mt: 1,width:'80%' }}>
                  {course?.tags?.length &&
                    course?.tags?.map((tag, index) => <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />)}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartOutlined />}
                    onClick={() =>
                      setOpenCourse({
                        ...course,
                        lessons: [
                          'Giới thiệu về Typography',
                          'Các nguyên tắc cơ bản',
                          'Phân loại font chữ',
                          'Kỹ thuật phối font',
                          'Thực hành thiết kế'
                        ],
                        features: ['Truy cập trọn đời', 'Chứng chỉ hoàn thành', 'Bài tập thực hành', 'Hỗ trợ 1-1', 'File thiết kế mẫu']
                      })
                    }
                  >
                    Chi tiết
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Course Detail Dialog */}
      <Dialog open={!!openCourse} onClose={() => setOpenCourse(null)} maxWidth="md" fullWidth>
        {openCourse && (
          <>
            <DialogTitle>
              <Typography variant="h5">{openCourse.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Giảng viên: {openCourse.instructor}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Nội dung khóa học
                  </Typography>
                  <List>
                    {openCourse?.lessons?.length &&
                      openCourse?.lessons.map((lesson, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <PlayCircleOutlined />
                          </ListItemIcon>
                          <ListItemText primary={lesson} />
                        </ListItem>
                      ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Bạn sẽ nhận được
                  </Typography>
                  <List>
                    {openCourse?.features?.length &&
                      openCourse.features.map((feature, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleOutlined style={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%' }}>
                <Typography variant="h5" color="primary">
                  {openCourse.price.toLocaleString()}đ
                </Typography>
                <PaymentQRCode
                  amount={openCourse.price}
                  orderId={`cource_${openCourse.id}`}
                  packageId={false}
                  variant="contained"
                  size="large"
                  label="Mua khóa học"
                  startIcon={<ShoppingCartOutlined />}
                  onClick={() => handlePurchase(openCourse)}
                />
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CourseList;
