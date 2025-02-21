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
import axios from 'utils/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/users`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Danh sách người dùng:', data.result.data);
        setUsers(data.result.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const updateUser = async (userId, updates) => {
    try {
      const response = await axios.get(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
    }
  };

  const handleToggleActive = (userId, status) => {
    updateUser(userId, { status: !status });
  };

  const handleRoleChange = (userId, newRole) => {
    updateUser(userId, { role: newRole });
  };

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
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thời gian tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                      <MenuItem value="user">Người dùng</MenuItem>
                      <MenuItem value="admin">Quản trị viên</MenuItem>
                      <MenuItem value="moderator">Người điều hành</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Switch checked={user.status} onChange={() => handleToggleActive(user._id, user.status)} color="primary" />
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement;
