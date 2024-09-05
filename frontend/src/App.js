import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageOne from './PageOne';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<PageOne />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
