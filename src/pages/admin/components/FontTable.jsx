import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Tooltip,
  Typography,
  Rating,
  Chip,
  Stack,
  Pagination
} from '@mui/material';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const FontTable = ({ 
  fonts, 
  loading, 
  onEdit, 
  onDelete, 
  onToggleActive, 
  onPreview,
  page,
  totalPages,
  onPageChange 
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Preview</TableCell>
              <TableCell>Tên Font</TableCell>
              <TableCell>Thông tin</TableCell>
              <TableCell>Thống kê</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fonts.map((font) => (
              <TableRow key={font.id}>
                <TableCell style={{ width: '200px' }}>
                  <Typography 
                    sx={{ 
                      fontFamily: font.name,
                      fontSize: '24px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Aa Bb Cc
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {font.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {font.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Chip 
                      label={font.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Stack direction="row" spacing={0.5}>
                      {font.styles.map(style => (
                        <Chip 
                          key={style} 
                          label={style} 
                          size="small" 
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      Downloads: {font.downloads.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Views: {font.views.toLocaleString()}
                    </Typography>
                    <Rating 
                      value={font.rating} 
                      readOnly 
                      size="small" 
                      precision={0.5}
                    />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={font.isActive}
                    onChange={() => onToggleActive(font.id)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Xem trước">
                      <IconButton onClick={() => onPreview(font)}>
                        <EyeOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton onClick={() => onEdit(font)}>
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton 
                        onClick={() => onDelete(font.id)}
                        color="error"
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack 
        direction="row" 
        justifyContent="center" 
        sx={{ mt: 2 }}
      >
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={onPageChange}
          color="primary"
        />
      </Stack>
    </>
  );
};

export default FontTable; 