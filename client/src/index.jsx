import React from 'react';
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
import theme from './themes';
import { ProfileProvider } from './context/profileContext';
import { SocketProvider } from './context/socketContext';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <ProfileProvider>
          <Router>
            <App />
          </Router>
        </ProfileProvider>
      </SocketProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
