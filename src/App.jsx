import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// project import
import router from './routes';
import ThemeCustomization from 'themes';
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from 'components/ScrollTop';
import AuthCheck from './components/AuthCheck';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>
      <AuthCheck>
        <ThemeCustomization>
          <BrowserRouter>
            <ScrollTop>
              <RouterProvider router={router} />
            </ScrollTop>
          </BrowserRouter>
        </ThemeCustomization>
      </AuthCheck>
    </Provider>
  );
}
