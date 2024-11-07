import { Navigate } from 'react-router-dom';
import store from '../store';

const PrivateRoute = ({ children }) => {
  const userToken = store.getState().user.token;
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
