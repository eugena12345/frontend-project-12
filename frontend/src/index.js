import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './slices/index.js';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
