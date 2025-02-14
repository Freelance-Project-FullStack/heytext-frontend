import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from 'store/reducers/auth';

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return children;
};

export default AuthCheck;
