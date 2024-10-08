import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageOne from './components/PageOne';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import RegistrationPage from './components/RegistrationPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<PageOne />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegistrationPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
