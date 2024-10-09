/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './slices/index';

import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

  <I18nextProvider i18n={i18n} defaultNS="translation">
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,

  // </React.StrictMode>
);
