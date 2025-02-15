// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { role } = useSelector((state) => state.auth);

  const filteredItems = menuItem.items.filter((item) => {
    return !item.requireRoles || item.requireRoles.includes(role);
  });

  const navGroups = filteredItems.map((item) => {
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
