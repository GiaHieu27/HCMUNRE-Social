import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

import './scss/main.scss';
import './styles/icons/icons.scss';
import App from './App';
import store from './redux/store';
import { ProfileProvider } from './profileContext/Context';
import theme from './themes';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ProfileProvider>
        <Router>
          <App />
        </Router>
      </ProfileProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
