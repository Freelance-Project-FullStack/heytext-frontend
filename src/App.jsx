import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </Provider>
  );
}
