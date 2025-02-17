import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Chip,
  Stack
} from '@mui/material';
import { DeleteOutlined, EditOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { fontService } from '../../services/fontService';

const FONT_CATEGORIES = ['Sans Serif', 'Serif', 'Script', 'Display', 'Decorative', 'Monospace', 'Calligraphy', 'Handwritten'];

const FONT_STYLES = ['Regular', 'Bold', 'Italic', 'Light', 'Medium', 'Black'];

const FONT_USES = ['Logo', 'Branding', 'Website', 'Print', 'Packaging', 'Social Media', 'Advertisement'];

const FontManagement = () => {
  const [fonts, setFonts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    style: '',
    usage: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    styles: [],
    uses: [],
    price: 0,
    fontFile: null,
    previewImage: null,
    tags: []
  });

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      const data = await fontService.getAllFonts();
      setFonts(data);
    } catch (error) {
      console.error('Error loading fonts:', error);
      // Add error handling/notification here
    }
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [type]: file
    }));
  };

  const handleOpen = (font = null) => {
    if (font) {
      setCurrentFont(font);
      setFormData({
        name: font.name,
        description: font.description,
        category: font.category,
        styles: font.styles,
        uses: font.uses,
        price: font.price,
        tags: font.tags
      });
    } else {
      setCurrentFont(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        styles: [],
        uses: [],
        price: 0,
        fontFile: null,
        previewImage: null,
        tags: []
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentFont(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentFont) {
        await fontService.updateFont(currentFont._id, formData);
      } else {
        await fontService.createFont(formData);
      }
      loadFonts();
      handleClose();
    } catch (error) {
      console.error('Error saving font:', error);
      // Add error handling/notification here
    }
  };

  const handleDelete = async (id) => {
    try {
      await fontService.deleteFont(id);
      loadFonts();
    } catch (error) {
      console.error('Error deleting font:', error);
      // Add error handling/notification here
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await fontService.toggleFontStatus(id);
      loadFonts();
    } catch (error) {
      console.error('Error toggling font status:', error);
      // Add error handling/notification here
    }
  };

  const filteredFonts = fonts.filter((font) => {
    const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || font.category === filters.category;
    const matchesStyle = !filters.style || font.styles.includes(filters.style);
    const matchesUsage = !filters.usage || font.uses.includes(filters.usage);
    return matchesSearch && matchesCategory && matchesStyle && matchesUsage;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Search and Filter Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Tìm kiếm font"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Danh mục</InputLabel>
              <Select value={filters.category} label="Danh mục" onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                <MenuItem value="">Tất cả</MenuItem>
                {FONT_CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Kiểu chữ</InputLabel>
              <Select value={filters.style} label="Kiểu chữ" onChange={(e) => setFilters({ ...filters, style: e.target.value })}>
                <MenuItem value="">Tất cả</MenuItem>
                {FONT_STYLES.map((style) => (
                  <MenuItem key={style} value={style}>
                    {style}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Mục đích sử dụng</InputLabel>
              <Select value={filters.usage} label="Mục đích sử dụng" onChange={(e) => setFilters({ ...filters, usage: e.target.value })}>
                <MenuItem value="">Tất cả</MenuItem>
                {FONT_USES.map((use) => (
                  <MenuItem key={use} value={use}>
                    {use}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button fullWidth variant="contained" startIcon={<CloudUploadOutlined />} onClick={() => handleOpen()} sx={{ height: '100%' }}>
            Thêm Font Mới
          </Button>
        </Grid>
      </Grid>

      {/* Fonts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Preview</TableCell>
              <TableCell>Tên Font</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Kiểu chữ</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Lượt tải</TableCell>
              <TableCell>Lượt xem</TableCell>
              <TableCell>Đánh giá</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFonts.map((font) => (
              <TableRow key={font.id}>
                <TableCell>
                  <img src={font.previewUrl} alt={font.name} style={{ height: 40, width: 'auto' }} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{font.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {font.description}
                  </Typography>
                </TableCell>
                <TableCell>{font.category}</TableCell>
                <TableCell>
                  {font.styles.map((style) => (
                    <Chip key={style} label={style} size="small" sx={{ m: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell>${font.price}</TableCell>
                <TableCell>{font.downloads}</TableCell>
                <TableCell>{font.views}</TableCell>
                <TableCell>{font.rating}/5</TableCell>
                <TableCell>
                  <Switch checked={font.isActive} onChange={() => handleToggleActive(font.id)} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(font)}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(font.id)}>
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Font Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{currentFont ? 'Chỉnh sửa Font' : 'Thêm Font Mới'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên Font"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select value={formData.category} label="Danh mục" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  {FONT_CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Kiểu chữ</InputLabel>
                <Select
                  multiple
                  value={formData.styles}
                  label="Kiểu chữ"
                  onChange={(e) => setFormData({ ...formData, styles: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {FONT_STYLES.map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadOutlined />}>
                Upload Font File
                <input type="file" hidden accept=".ttf,.otf" onChange={(e) => handleFileUpload(e, 'fontFile')} />
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadOutlined />}>
                Upload Preview Image
                <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'previewImage')} />
              </Button>
            </Grid>
            {/* Font Preview Section */}
            {formData.fontUrl && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Font Preview
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    fontFamily: currentFont?.name
                  }}
                >
                  <Typography variant="h5">The quick brown fox jumps over the lazy dog</Typography>
                  <Typography>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {currentFont ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FontManagement;
