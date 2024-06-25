/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, allowedUserTypes }) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedUserTypes && !allowedUserTypes.includes(userType?.email)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
