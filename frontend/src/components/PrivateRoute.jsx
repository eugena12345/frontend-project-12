import { useNavigate } from 'react-router-dom';
import store from '../store';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userToken = store.getState().user.token;
  if (!userToken) {
    navigate('/login', { replace: false });
    return null;
  }
  return children;
};

export default PrivateRoute;
