// assets
import {
  SnippetsOutlined,
  DashboardOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  FontColorsOutlined,
  SettingOutlined
} from '@ant-design/icons';
// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  FontColorsOutlined,
  SettingOutlined,
  SnippetsOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Quản trị hệ thống',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
      requireRoles: ['admin']
    },
    {
      id: 'admin-users',
      title: 'Người dùng',
      type: 'item',
      url: '/admin/users',
      icon: icons.UserOutlined,
      breadcrumbs: false,
      requireRoles: ['admin']
    },
    {
      id: 'admin-courses',
      title: 'Khoá học',
      type: 'item',
      url: '/admin/courses',
      icon: icons.CodeSandboxOutlined,
      breadcrumbs: false,
      requireRoles: ['admin']
    },
    {
      id: 'admin-fonts',
      title: 'Font',
      type: 'item',
      url: '/admin/fonts',
      icon: icons.FontColorsOutlined,
      breadcrumbs: false,
      requireRoles: ['admin']
    },
    {
      id: 'admin-settings',
      title: 'Cài đặt',
      type: 'item',
      url: '/admin/settings',
      icon: icons.SettingOutlined,
      breadcrumbs: false,
      requireRoles: ['admin']
    },
    {
      id: 'admin-transactions',
      url: '/admin/transactions',
      type: 'item',
      title: 'Lịch sử giao dịch',
      icon: icons.SnippetsOutlined,
      breadcrumbs: false,
      requireRoles: ['admin']
    }
  ]
};

export default dashboard;
