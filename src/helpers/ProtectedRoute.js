import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/Routes';

export default function ProtectedRoute({ user, children }) {
  if (user) {
    return children;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return null;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
