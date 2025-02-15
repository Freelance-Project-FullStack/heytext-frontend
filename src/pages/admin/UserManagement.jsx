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

  const baseURL = import.meta.env.VITE_APP_URL;

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseURL}/users`); // Thêm URL API cơ bản
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.result.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
      }
    };
    fetchUsers();
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
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
              <TableCell>Ảnh</TableCell>
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
                <TableCell>{user.avatar}</TableCell>
                <TableCell>{user.name}</TableCell>
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

