import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegistrationPage from './pages/RegistrationPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/"
        element={
          (
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegistrationPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
