import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('token');
  useEffect(() => {
    if (!userToken) {
      navigate('/login', { replace: false });
    }
  }, [userToken, navigate]);

  return children;
};

export default PrivateRoute;
