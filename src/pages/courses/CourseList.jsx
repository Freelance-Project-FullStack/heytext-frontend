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

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
      const fetchCourses = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${baseURL}/courses`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data.status === 'success') {
              console.log(data.result.data);
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

 
  const filterCourses = courses.filter(
    (course) => course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Box sx={{ mb: 3 }}>
        <TextField fullWidth label="Tìm kiếm khóa học" variant="outlined" value={searchTerm} onChange={handleSearch} />
      </Box>


      <Grid container spacing={3}>
        {filterCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {course.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  {course.price.toLocaleString('vi-VN')}đ
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {course.tags?.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default CourseList;
