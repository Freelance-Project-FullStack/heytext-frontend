// assets
import { DashboardOutlined, UserOutlined, CodeSandboxOutlined, FontColorsOutlined } from '@ant-design/icons';
// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  FontColorsOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Admin',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-users',
      title: 'Users',
      type: 'item',
      url: '/admin/users',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-courses',
      title: 'Course',
      type: 'item',
      url: '/admin/courses',
      icon: icons.CodeSandboxOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-fonts',
      title: 'Font',
      type: 'item',
      url: '/admin/fonts',
      icon: icons.FontColorsOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
