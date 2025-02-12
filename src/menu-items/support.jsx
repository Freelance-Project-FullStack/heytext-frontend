// assets
import { ChromeOutlined, FontSizeOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  FontSizeOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined
    },
    {
      id: 'support',
      title: 'Do you need a support?',
      type: 'item',
      url: 'https://www.facebook.com/',
      icon: icons.FontSizeOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;
