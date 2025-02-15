import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import PrivateRoute from 'components/PrivateRoute';
import AdminLayout from 'layout/AdminLayout';

// const Color = Loadable(lazy(() => import('pages/component-overview/color')));
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

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    // {
    //   path: '/',
    //   element: <DashboardDefault />
    // },
    {
      path: 'admin',
      children: [
        {
          path: 'dashboard',
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
      element: (
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      ),
      children: [
        {
          path: 'dashboard',
          element: <AdminDashboard />
        },
        {
          path: 'users',
          element: <UserManagement />
        },
        {
          path: 'courses',
          element: <CourseManagement />
        },
        {
          path: 'fonts',
          element: <FontManagement />
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
    },
    {
      path: 'admin/dashboard',
      element: (
        <PrivateRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      )
    },
    {
      path: '/',
      element: (
        <PrivateRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      )
    }
  ]
};

export default MainRoutes;
