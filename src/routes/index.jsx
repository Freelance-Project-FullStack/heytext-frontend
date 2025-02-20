import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MinimalLayout from 'layout/MinimalLayout';
import Dashboard from 'layout/Dashboard';
import AdminLayout from 'layout/AdminLayout';
import PrivateRoute from 'components/PrivateRoute';

// Pages (Lazy-loaded)
import AuthLogin from 'pages/authentication/login';
import AuthRegister from 'pages/authentication/register';
import Callback from 'pages/authentication/auth-forms/Callback';
import AdminDashboard from 'pages/dashboard';
import UserManagement from 'pages/admin/UserManagement';
import FontManagement from 'pages/admin/FontManagement';
import CourseManagement from 'pages/admin/CourseManagement';
import TransactionHistory from 'pages/admin/TransactionHistory';
import FontSelector from 'pages/fonts/FontSelector';
import Chatbot from 'pages/chat/Chatbot';
import PricingPlans from 'pages/subscription/PricingPlans';
import CourseList from 'pages/courses/CourseList';
import Profile from 'pages/profile/Profile';
import Settings from 'pages/admin/Settings';
import UnauthorizedPage from 'pages/UnauthorizedPage';
import NotFoundPage from 'pages/NotFoundPage';

// Admin Route Guard
// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

// ==============================|| APP ROUTING ||============================== //

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MinimalLayout />}>
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
        <Route path="callback" element={<Callback />} />
      </Route>

      {/* Protected User Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fonts" element={<FontSelector />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/subscription" element={<PricingPlans />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="fonts" element={<FontManagement />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Error & Unauthorized Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
