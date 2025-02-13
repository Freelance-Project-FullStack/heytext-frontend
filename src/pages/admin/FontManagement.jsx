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
  IconButton
} from '@mui/material';

import { DeleteOutlined, EditOutlined, AppstoreAddOutlined } from '@ant-design/icons';
const FontManagement = () => {
  const [fonts, setFonts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    filePath: '',
    uploadedBy: ''
  });

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const mockFonts = [
      {
        id: 1,
        name: 'Arial Pro',
        filePath: '/fonts/arial-pro.ttf',
        uploadedBy: 'admin',
        downloads: 150,
        isActive: true,
        createdAt: '2024-03-20'
      }
      // Thêm fonts khác
    ];
    setFonts(mockFonts);
  }, []);

  const handleOpen = (font = null) => {
    if (font) {
      setCurrentFont(font);
      setFormData({
        name: font.name,
        filePath: font.filePath,
        uploadedBy: font.uploadedBy
      });
    } else {
      setCurrentFont(null);
      setFormData({
        name: '',
        filePath: '',
        uploadedBy: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentFont(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentFont) {
      // Update existing font
      setFonts(fonts.map(f => 
        f.id === currentFont.id ? { ...f, ...formData } : f
      ));
    } else {
      // Add new font
      setFonts([...fonts, {
        id: fonts.length + 1,
        ...formData,
        downloads: 0,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setFonts(fonts.filter(font => font.id !== id));
    // Add API call to delete font
  };

  const handleToggleActive = (id) => {
    setFonts(fonts.map(font =>
      font.id === id ? { ...font, isActive: !font.isActive } : font
    ));
    // Add API call to update status
  };

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          label="Tìm kiếm font"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<AppstoreAddOutlined />}
          onClick={() => handleOpen()}
        >
          Thêm Font Mới
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Font</TableCell>
              <TableCell>Đường dẫn</TableCell>
              <TableCell>Người tải lên</TableCell>
              <TableCell>Lượt tải</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFonts.map((font) => (
              <TableRow key={font.id}>
                <TableCell>{font.name}</TableCell>
                <TableCell>{font.filePath}</TableCell>
                <TableCell>{font.uploadedBy}</TableCell>
                <TableCell>{font.downloads}</TableCell>
                <TableCell>{font.createdAt}</TableCell>
                <TableCell>
                  <Switch
                    checked={font.isActive}
                    onChange={() => handleToggleActive(font.id)}
                  />
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentFont ? 'Chỉnh sửa Font' : 'Thêm Font Mới'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tên Font"
              margin="normal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Đường dẫn"
              margin="normal"
              value={formData.filePath}
              onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
            />
            <TextField
              fullWidth
              label="Người tải lên"
              margin="normal"
              value={formData.uploadedBy}
              onChange={(e) => setFormData({ ...formData, uploadedBy: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentFont ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FontManagement; 