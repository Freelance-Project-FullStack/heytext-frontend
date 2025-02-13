// assets
import { LoginOutlined, ProfileOutlined, FontColorsOutlined, WechatWorkOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  FontColorsOutlined,
  WechatWorkOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Heytext',
  type: 'group',
  children: [
    {
      id: 'font',
      title: 'Font',
      type: 'item',
      url: '/fonts',
      icon: icons.FontColorsOutlined,
      target: true
    },
    {
      id: 'chat',
      title: 'Chatbot',
      type: 'item',
      url: '/chat',
      icon: icons.WechatWorkOutlined,
      target: true,
      breadcrumbs: false
    },
    {
      id: 'course',
      title: 'Course',
      type: 'item',
      url: '/course',
      icon: icons.WechatWorkOutlined,
      target: true
    },
    {
      id: 'package',
      title: 'Package',
      type: 'item',
      url: '/package',
      icon: icons.WechatWorkOutlined,
      target: true
    }
  ]
};

export default pages;
