import PropTypes from 'prop-types';

export default function ToolbarItem({ className = '', active, Icon, onClick }) {
  return (
    <Icon
      className={`${className} ${
        active ? ' bg-blue-300 dark:bg-blue-900' : ''
      }`}
      onClick={onClick}
    />
  );
}

ToolbarItem.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  Icon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
