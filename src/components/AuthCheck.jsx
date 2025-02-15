import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';
import { checkAuthStatus } from 'store/reducers/auth';

// eslint-disable-next-line react/prop-types
const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = () => {
      try {
        dispatch(checkAuthStatus());
      } finally {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (isChecking || loading) {
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

  return children;
};

export default AuthCheck;
