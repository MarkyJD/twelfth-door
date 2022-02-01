import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export default function NavItem({
  icon,
  expanded,
  title,
  path,
  active = false,
  setCurrentPath,
}) {
  const Icon = icon;
  const navigate = useNavigate();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        setCurrentPath(path);
        navigate(path);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          setCurrentPath(path);
          navigate(path);
        }
      }}
      className={`h-12 w-full mb-1 px-1 cursor-pointer flex space-x-3 items-center rounded hover:bg-slate-600 text-white font-semibold ${
        active && ' text-lightBlue-100'
      } ${!expanded && ' justify-center'}`}
    >
      <Icon className="icon" />
      {expanded && <h2>{title}</h2>}
    </div>
  );
}

NavItem.propTypes = {
  icon: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool,
  setCurrentPath: PropTypes.func,
};
