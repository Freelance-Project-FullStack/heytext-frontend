import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// admin pages
const UserManagement = Loadable(lazy(() => import('pages/admin/UserManagement')));
const FontManagement = Loadable(lazy(() => import('pages/admin/FontManagement')));
const CourseManagement = Loadable(lazy(() => import('pages/admin/CourseManagement')));

const FontSelector = Loadable(lazy(() => import('pages/fonts/FontSelector')));

const Chatbot = Loadable(lazy(() => import('pages/chat/Chatbot')));

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
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
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
    }
  ]
};

export default MainRoutes;
