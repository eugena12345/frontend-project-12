import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageOne from './components/PageOne';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

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
