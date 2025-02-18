import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { getFonts, createFont, updateFont, deleteFont } from 'store/reducers/fontSlice';

const FONT_CATEGORIES = ['Sans Serif', 'Serif', 'Script', 'Display', 'Decorative', 'Monospace', 'Calligraphy', 'Handwritten'];

const FontManagement = () => {
  const dispatch = useDispatch();
  const { fonts, loading, error } = useSelector((state) => state.fonts);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFont, setSelectedFont] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    styles: [],
    uses: [],
    price: 0,
    fontFile: null,
    previewImage: null
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadFonts();
  }, [dispatch]);

  useEffect(() => {
    if (selectedFont) {
      setFormData({
        name: selectedFont.name,
        category: selectedFont.category,
        styles: selectedFont.styles,
        uses: selectedFont.uses,
        price: selectedFont.price
      });
    }
  }, [selectedFont]);

  const loadFonts = async () => {
    try {
      await dispatch(getFonts()).unwrap();
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fontData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'styles' || key === 'uses') {
          fontData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] instanceof File) {
          fontData.append(key, formData[key]);
        } else {
          fontData.append(key, formData[key]);
        }
      });

      if (selectedFont) {
        await dispatch(updateFont({ id: selectedFont.id, fontData })).unwrap();
        showNotification('Font updated successfully');
      } else {
        await dispatch(createFont(fontData)).unwrap();
        showNotification('Font created successfully');
      }

      handleCloseDialog();
      loadFonts();
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this font?')) {
      try {
        await dispatch(deleteFont(id)).unwrap();
        showNotification('Font deleted successfully');
        loadFonts();
      } catch (error) {
        showNotification(error.message, 'error');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFont(null);
    setFormData({
      name: '',
      category: '',
      styles: [],
      uses: [],
      price: 0,
      fontFile: null,
      previewImage: null
    });
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const filteredFonts = fonts.filter(
    (font) => font.name.toLowerCase().includes(searchTerm.toLowerCase()) && (categoryFilter === 'all' || font.category === categoryFilter)
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5">Font Management</Typography>
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpenDialog(true)}>
          Add New Font
        </Button>
      </Stack>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search fonts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchOutlined style={{ marginRight: 8 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category Filter</InputLabel>
                <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Category Filter">
                  <MenuItem value="all">All Categories</MenuItem>
                  {FONT_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Fonts Grid */}
      <Grid container spacing={3}>
        {filteredFonts.map((font) => (
          <Grid item xs={12} md={6} lg={4} key={font.id}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{font.name}</Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedFont(font);
                          setOpenDialog(true);
                        }}
                      >
                        <EditOutlined />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(font.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    Category: {font.category}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {font.styles.map((style) => (
                      <Chip key={style} label={style} size="small" />
                    ))}
                  </Stack>

                  <Typography variant="body2">Price: ${font.price}</Typography>

                  <Typography variant="body2">Downloads: {font.downloads}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedFont ? 'Edit Font' : 'Add New Font'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Font Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} label="Category">
                {FONT_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="number"
              fullWidth
              label="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />

            {!selectedFont && (
              <Button variant="outlined" component="label">
                Upload Font File
                <input
                  type="file"
                  hidden
                  accept=".ttf,.otf"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fontFile: e.target.files[0]
                    })
                  }
                />
              </Button>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {selectedFont ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({ ...notification, open: false })}>
        <Alert severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FontManagement;
