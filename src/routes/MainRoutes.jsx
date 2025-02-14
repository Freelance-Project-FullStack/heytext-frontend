import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import PrivateRoute from 'components/PrivateRoute';

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
const AdminDashboard = Loadable(lazy(() => import('pages/dashboard')));
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
          element: (
            <PrivateRoute allowedRoles={['admin']}>
              <UserManagement />
            </PrivateRoute>
          )
        },
        {
          path: 'fonts',
          element: (
            <PrivateRoute allowedRoles={['admin']}>
              <FontManagement />
            </PrivateRoute>
          )
        },
        {
          path: 'courses',
          element: (
            <PrivateRoute allowedRoles={['admin']}>
              <CourseManagement />
            </PrivateRoute>
          )
        },
        {
          path: 'settings',
          element: (
            <PrivateRoute allowedRoles={['admin']}>
              <Settings />
            </PrivateRoute>
          )
        }
      ]
    },
    {
      path: 'fonts',
      element: (
        <PrivateRoute allowedRoles={['admin', 'premium', 'user']}>
          <FontSelector />
        </PrivateRoute>
      )
    },
    {
      path: 'chat',
      element: <Chatbot />
    },
    {
      path: 'courses',
      element: <CourseList />
    },
    {
      path: 'admin/dashboard',
      element: (
        <PrivateRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      )
    }
  ]
};

export default MainRoutes;
