import PropTypes from 'prop-types';

export default function Toolbar({ children }) {
  return (
    <div className="flex container space-x-3 border-b py-1">{children}</div>
  );
}

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
};
