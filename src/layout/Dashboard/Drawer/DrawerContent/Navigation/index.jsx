// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

// project import
import NavGroup from './NavGroup';
import dashboard from 'menu-items/dashboard';
import pages from 'menu-items/page';
import support from 'menu-items/support';
import { useEffect, useState } from 'react';
// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { role } = useSelector((state) => state.auth);
  const [menuItem, setMenuItem] = useState([]);
  useEffect(() => {
    const authRole = localStorage.getItem('userRole');
    if (authRole == 'admin') {
      setMenuItem([dashboard, pages, support]);
    } else setMenuItem([pages, support]);
  }, [role]);

  const navGroups = menuItem.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
