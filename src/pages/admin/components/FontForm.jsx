import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Paper,
  Stack,
  OutlinedInput
} from '@mui/material';
import { CloudUploadOutlined } from '@ant-design/icons';
import { FONT_CATEGORIES, FONT_STYLES, FONT_USES } from '../constants';

const FontForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialData = null,
  loading 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    styles: [],
    uses: [],
    price: 0,
    tags: [],
    fontFile: null,
    previewImage: null
  });
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        fontFile: null,
        previewImage: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = {
      fontFile: ['font/ttf', 'font/otf', 'application/x-font-ttf', 'application/x-font-otf'],
      previewImage: ['image/jpeg', 'image/png', 'image/webp']
    };

    if (!validTypes[type].includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [type]: `Invalid file type. Allowed types: ${validTypes[type].join(', ')}`
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
    setErrors(prev => ({ ...prev, [type]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Tên font là bắt buộc';
    if (!formData.category) newErrors.category = 'Danh mục là bắt buộc';
    if (!formData.styles.length) newErrors.styles = 'Chọn ít nhất một kiểu chữ';
    if (!initialData && !formData.fontFile) newErrors.fontFile = 'File font là bắt buộc';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: '90vh' }
      }}
    >
      <DialogTitle>
        {initialData ? 'Chỉnh sửa Font' : 'Thêm Font Mới'}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Tên Font"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {FONT_CATEGORIES.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          {/* Styles and Uses */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <FormControl fullWidth error={!!errors.styles}>
                <InputLabel>Kiểu chữ</InputLabel>
                <Select
                  multiple
                  name="styles"
                  value={formData.styles}
                  onChange={handleChange}
                  input={<OutlinedInput label="Kiểu chữ" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {FONT_STYLES.map(style => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Mục đích sử dụng</InputLabel>
                <Select
                  multiple
                  name="uses"
                  value={formData.uses}
                  onChange={handleChange}
                  input={<OutlinedInput label="Mục đích sử dụng" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {FONT_USES.map(use => (
                    <MenuItem key={use} value={use}>
                      {use}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="number"
                label="Giá"
                name="price"
                value={formData.price}
                onChange={handleChange}
                InputProps={{
                  startAdornment: '$'
                }}
              />
            </Stack>
          </Grid>

          {/* File Upload Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadOutlined />}
                  fullWidth
                >
                  Upload Font File
                  <input
                    type="file"
                    hidden
                    accept=".ttf,.otf"
                    onChange={(e) => handleFileUpload(e, 'fontFile')}
                  />
                </Button>
                {errors.fontFile && (
                  <Typography color="error" variant="caption">
                    {errors.fontFile}
                  </Typography>
                )}
                {formData.fontFile && (
                  <Typography variant="body2">
                    Selected file: {formData.fontFile.name}
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>

          {/* Preview Section */}
          {(formData.fontFile || initialData) && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Preview
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography 
                  sx={{ 
                    fontFamily: formData.fontFile ? 'PreviewFont' : initialData?.name,
                    fontSize: '24px'
                  }}
                >
                  {previewText}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : initialData ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FontForm; 