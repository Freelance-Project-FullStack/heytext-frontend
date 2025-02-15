import { useState } from 'react';
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

const COURSE_CATEGORIES = ['Typography Cơ bản', 'Thiết kế Logo', 'Branding', 'UI/UX Design', 'Font Design'];

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openCourse, setOpenCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'Typography Masterclass',
      description: 'Khóa học toàn diện về Typography từ cơ bản đến nâng cao',
      thumbnail: '/images/course-1.jpg',
      price: 1990000,
      rating: 4.8,
      students: 1250,
      duration: '20 giờ',
      category: 'Typography Cơ bản',
      instructor: 'John Designer',
      lessons: ['Giới thiệu về Typography', 'Các nguyên tắc cơ bản', 'Phân loại font chữ', 'Kỹ thuật phối font', 'Thực hành thiết kế'],
      features: ['Truy cập trọn đời', 'Chứng chỉ hoàn thành', 'Bài tập thực hành', 'Hỗ trợ 1-1', 'File thiết kế mẫu']
    }
    // Thêm các khóa học khác
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? 'all' : category);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePurchase = async (course) => {
    try {
      // Gọi API tạo đơn hàng VNPay
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: course.price,
          orderType: 'course',
          orderInfo: `Mua khóa học: ${course.title}`,
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm khóa học..."
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

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {COURSE_CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleCategoryClick(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              clickable
            />
          ))}
        </Box>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardMedia component="img" height="200" image={course.thumbnail} alt={course.title} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={course.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({course.rating})
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <UserOutlined style={{ marginRight: 4 }} />
                    {course.students} học viên
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {course.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {course.price.toLocaleString()}đ
                  </Typography>
                  <Button variant="contained" startIcon={<ShoppingCartOutlined />} onClick={() => setOpenCourse(course)}>
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
                    {openCourse.lessons.map((lesson, index) => (
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
                    {openCourse.features.map((feature, index) => (
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="h5" color="primary">
                  {openCourse.price.toLocaleString()}đ
                </Typography>
                <PaymentQRCode
                  amount={openCourse.price}
                  orderId={`cource_${openCourse.id}`}
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
