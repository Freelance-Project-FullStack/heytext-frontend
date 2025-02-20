import { Provider } from 'react-redux';
import store from './store';

// project import
import AppRoutes from './routes';
import ThemeCustomization from 'themes';
// import ScrollTop from 'components/ScrollTop';
import AuthCheck from './components/AuthCheck';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>
      <AuthCheck>
        <ThemeCustomization>
          <AppRoutes />
        </ThemeCustomization>
      </AuthCheck>
    </Provider>
  );
}
