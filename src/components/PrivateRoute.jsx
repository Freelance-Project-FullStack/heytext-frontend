import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, role, loading } = useSelector((state) => state.auth);

  // Hiển thị loading khi đang kiểm tra authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Lưu đường dẫn hiện tại vào state
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Kiểm tra quyền truy cập nếu có
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Chuyển hướng về trang mặc định của role hiện tại
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
