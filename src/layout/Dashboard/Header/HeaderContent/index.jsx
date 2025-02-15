// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { GithubOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      <IconButton
        component={Link}
        href="#"
        target="_blank"
        disableRipple
        color="secondary"
        title="Use Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton>
      {!isAuthenticated ? (
        <>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              mr: 2,
              borderColor: 'primary.main',
              padding: '4px 8px', // Thêm padding tương tự
              borderRadius: '4px', // Làm mềm các góc
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.lighter',
                transition: 'background-color 0.3s ease, border-color 0.3s ease' // Hiệu ứng mượt mà cho hover
              },
              height: '40px',
              width: '150px',
              ml: 10
            }}
          >
            Đăng nhập
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{
              boxShadow: 'none',
              padding: '4px 8px', // Thêm padding tương tự
              borderRadius: '4px', // Làm mềm các góc
              '&:hover': {
                backgroundColor: 'primary.dark',
                boxShadow: 'none',
                transition: 'background-color 0.3s ease' // Hiệu ứng mượt mà cho hover
              },
              height: '40px',
              width: '150px'
            }}
          >
            Đăng ký
          </Button>
        </>
      ) : (
        <>
          <Notification />
          {!downLG && <Profile />}
          {downLG && <MobileSection />}
        </>
      )}
    </>
  );
}
