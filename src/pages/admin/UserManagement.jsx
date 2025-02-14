import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const mockUsers = [
      { id: 1, username: 'user1', email: 'user1@example.com', phone: '0123456789', role: 'user', isActive: true },
      { id: 2, username: 'admin1', email: 'admin1@example.com', phone: '0987654321', role: 'admin', isActive: true }
      // Thêm users mock khác
    ];
    setUsers(mockUsers);
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Xử lý thay đổi trạng thái active
  const handleToggleActive = (userId) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)));
    // Thêm API call để cập nhật trạng thái
  };

  // Xử lý thay đổi role
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
    // Thêm API call để cập nhật role
  };

  // Lọc users theo search term
  const filteredUsers = users.filter(
    (user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TextField fullWidth label="Tìm kiếm user" variant="outlined" value={searchTerm} onChange={handleSearch} />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                      <MenuItem value="user">Người dùng</MenuItem>
                      <MenuItem value="admin">Quản trị viên</MenuItem>
                      <MenuItem value="moderator">Người điều hành</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Switch checked={user.isActive} onChange={() => handleToggleActive(user.id)} color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement;
