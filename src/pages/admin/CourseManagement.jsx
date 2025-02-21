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
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment
} from '@mui/material';
import { DeleteOutlined, EditOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import axios from 'utils/axios';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/courses`);
        const data = response.data;
        if (!data.success) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
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

  // Open dialog for adding/editing a course
  const handleOpen = (course = null) => {
    if (course) {
      setCurrentCourse(course);
      setFormData({
        title: course.name,
        description: course.description,
        price: course.price.toString(),
        tags: course.tags?.join(', ') || '',
        imageUrl: course.image
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

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setCurrentCourse(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedData = {
      name: formData.title,
      description: formData.description,
      price: Number(formData.price),
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      image: formData.imageUrl
    };

    try {
      let response;
      let updatedCourse;
      if (currentCourse) {
        // Update existing course
        response = await axios.get(`/courses/${currentCourse._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedData)
        });

        updatedCourse = { ...currentCourse, ...processedData };
        console.log(updatedCourse);
        setSnackbarMessage('Course updated successfully!');
        setSnackbarOpen(true);
        setCourses((prevCourses) => {
          return prevCourses.map((course) => (course._id === updatedCourse._id ? updatedCourse : course));
        });

        handleClose();
      } else {
        // Add new course
        response = await axios.get(`/courses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedData)
        });

        const newdata = await response.json();
        setSnackbarMessage('Course added successfully!');
        setSnackbarOpen(true);
        updatedCourse = { ...processedData, _id: newdata.data.id };

        setCourses((prevCourses) => {
          return [...prevCourses, updatedCourse];
        });

        handleClose();
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving course:', error);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  // Handle course deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.get(`/courses/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'success') {
        setSnackbarMessage('Course deleted successfully!');
        setSnackbarOpen(true);
        setCourses(courses.filter((course) => course._id !== id));
      } else {
        throw new Error(data.message || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterCourses = courses.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TextField fullWidth label="Tìm kiếm khóa học" variant="outlined" value={searchTerm} onChange={handleSearch} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý Khóa học</Typography>
        <Button variant="contained" startIcon={<AppstoreAddOutlined />} onClick={() => handleOpen()}>
          Thêm Khóa học
        </Button>
      </Box>

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
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  {course.price.toLocaleString('vi-VN')}đ
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {course.tags?.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => handleOpen(course)}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(course._id)}>
                    <DeleteOutlined />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{currentCourse ? 'Chỉnh sửa Khóa học' : 'Thêm Khóa học Mới'}</DialogTitle>
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
                startAdornment: <InputAdornment position="start">VND</InputAdornment>
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

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseManagement;
