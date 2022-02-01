import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function IsLoggedInRoute({ isLoggedInPath, user, children }) {
  if (!user) {
    return children;
  }

  if (user) {
    return <Navigate to={isLoggedInPath} />;
  }

  return null;
}

IsLoggedInRoute.propTypes = {
  user: PropTypes.object,
  isLoggedInPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
