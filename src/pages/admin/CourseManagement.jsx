import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material';
import { DeleteOutlined, EditOutlined, AppstoreAddOutlined } from '@ant-design/icons';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
    imageUrl: '',
  });

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        title: 'Khóa học Photoshop cơ bản',
        description: 'Học Photoshop từ cơ bản đến nâng cao',
        price: 299000,
        tags: ['design', 'photoshop', 'beginner'],
        imageUrl: '/images/course1.jpg',
        createdAt: '2024-03-20',
        purchases: 45
      }
      // Thêm khóa học khác
    ];
    setCourses(mockCourses);
  }, []);

  const handleOpen = (course = null) => {
    if (course) {
      setCurrentCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        tags: course.tags.join(', '),
        imageUrl: course.imageUrl
      });
    } else {
      setCurrentCourse(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        tags: '',
        imageUrl: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCourse(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      price: Number(formData.price),
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    if (currentCourse) {
      // Update existing course
      setCourses(courses.map(c =>
        c.id === currentCourse.id ? { ...c, ...processedData } : c
      ));
    } else {
      // Add new course
      setCourses([...courses, {
        id: courses.length + 1,
        ...processedData,
        createdAt: new Date().toISOString().split('T')[0],
        purchases: 0
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    // Add API call to delete course
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý Khóa học</Typography>
        <Button
          variant="contained"
          startIcon={<AppstoreAddOutlined />}
          onClick={() => handleOpen()}
        >
          Thêm Khóa học
        </Button>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.imageUrl}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {course.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  {course.price.toLocaleString('vi-VN')}đ
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {course.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Lượt mua: {course.purchases}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => handleOpen(course)}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(course.id)}>
                    <DeleteOutlined />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentCourse ? 'Chỉnh sửa Khóa học' : 'Thêm Khóa học Mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tên khóa học"
              margin="normal"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Mô tả"
              margin="normal"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              fullWidth
              label="Giá"
              margin="normal"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">VND</InputAdornment>,
              }}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <TextField
              fullWidth
              label="Tags (phân cách bằng dấu phẩy)"
              margin="normal"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              helperText="Ví dụ: design, photoshop, beginner"
            />
            <TextField
              fullWidth
              label="URL Ảnh"
              margin="normal"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentCourse ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement; 