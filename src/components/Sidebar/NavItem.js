import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NavItem({
  icon,
  expanded,
  title,
  path,
  active = false,
}) {
  const Icon = icon;

  return (
    <Link
      to={path}
      className={`h-12 w-full mb-1 px-1 cursor-pointer flex space-x-3 items-center rounded hover:bg-slate-600 text-white font-semibold ${
        active && ' text-lightBlue-100'
      } ${!expanded && ' justify-center'}`}
    >
      <Icon className="icon" />
      {expanded && <h2>{title}</h2>}
    </Link>
  );
}

NavItem.propTypes = {
  icon: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
