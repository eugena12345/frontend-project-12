import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userToken = store.getState().user.ids[0];
  useEffect(() => {
    if (!userToken) {
      navigate('/login', { replace: false });
    }
  }, [userToken, navigate]);

  return userToken && children;
};

export default PrivateRoute;
