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
  title: 'Hỗ trợ',
  type: 'group',
  children: [
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
