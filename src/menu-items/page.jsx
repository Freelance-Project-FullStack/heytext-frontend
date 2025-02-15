// assets
import {
  LoginOutlined,
  ProfileOutlined,
  FontColorsOutlined,
  WechatWorkOutlined,
  BookOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  FontColorsOutlined,
  WechatWorkOutlined,
  BookOutlined,
  CheckCircleOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'guest',
  title: 'Heytext',
  type: 'group',
  children: [
    {
      id: 'guest-fonts',
      title: 'Font',
      type: 'item',
      url: '/fonts',
      icon: icons.FontColorsOutlined,
      breadcrumbs: false
      // target: true
    },
    {
      id: 'guest-chat',
      title: 'Chatbot',
      type: 'item',
      url: '/chat',
      icon: icons.WechatWorkOutlined,
      breadcrumbs: false
    },
    {
      id: 'guest-courses',
      title: 'Khoá học',
      type: 'item',
      url: '/courses',
      icon: icons.BookOutlined,
      breadcrumbs: false
    },
    {
      id: 'guest-subscription',
      title: 'Subscription',
      type: 'item',
      url: '/subscription',
      icon: icons.CheckCircleOutlined,
      breadcrumbs: false
    }
  ]
};

export default pages;
