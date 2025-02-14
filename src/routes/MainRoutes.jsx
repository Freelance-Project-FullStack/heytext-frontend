import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// admin pages
const UserManagement = Loadable(lazy(() => import('pages/admin/UserManagement')));
const FontManagement = Loadable(lazy(() => import('pages/admin/FontManagement')));
const CourseManagement = Loadable(lazy(() => import('pages/admin/CourseManagement')));

const FontSelector = Loadable(lazy(() => import('pages/fonts/FontSelector')));
const Chatbot = Loadable(lazy(() => import('pages/chat/Chatbot')));
const PricingPlans = Loadable(lazy(() => import('pages/subscription/PricingPlans')));
const CourseList = Loadable(lazy(() => import('pages/courses/CourseList')));
const Profile = Loadable(lazy(() => import('pages/profile/Profile')));
const Settings = Loadable(lazy(() => import('pages/admin/Settings')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'subscription',
      element: <PricingPlans />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'admin',
      children: [
        {
          path: 'users',
          element: <UserManagement />
        },
        {
          path: 'fonts',
          element: <FontManagement />
        },
        {
          path: 'courses',
          element: <CourseManagement />
        },
        {
          path: 'settings',
          element: <Settings />
        }
      ]
    },
    {
      path: 'fonts',
      element: <FontSelector />
    },
    {
      path: 'chat',
      element: <Chatbot />
    },
    {
      path: 'courses',
      element: <CourseList />
    }
  ]
};

export default MainRoutes;
