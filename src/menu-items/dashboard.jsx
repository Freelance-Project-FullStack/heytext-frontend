// assets
import { DashboardOutlined, UserOutlined, CodeSandboxOutlined, FontColorsOutlined, SettingOutlined } from '@ant-design/icons';
// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  FontColorsOutlined,
  SettingOutlined
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
      breadcrumbs: false
    },
    {
      id: 'admin-users',
      title: 'Người dùng',
      type: 'item',
      url: '/admin/users',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-courses',
      title: 'Khoá học',
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
    },
    {
      id: 'admin-settings',
      title: 'Cài đặt',
      type: 'item',
      url: '/admin/settings',
      icon: icons.SettingOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
