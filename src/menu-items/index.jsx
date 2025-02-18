// project import
import dashboard from './dashboard';
import pages from './page';
import support from './support';

// ==============================|| MENU ITEMS ||============================== //

// const getMenuItems = () => {
//   const authRole = localStorage.getItem('userRole');

//   if (authRole === 'admin') {
//     return {
//       items: [dashboard, pages, support]
//     };
//   }
//   return {
//     items: [pages, support]
//   };
// };

const menuItems = {
  items: [dashboard, pages, support]
};

export default menuItems;
