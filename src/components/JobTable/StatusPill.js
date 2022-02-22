import PropTypes from 'prop-types';

export default function StatusPill({ priority, className }) {
  let statusStyles = '';

  switch (priority) {
    case 'low':
      statusStyles += ' bg-blue-500 ';
      break;
    case 'medium':
      statusStyles += ' bg-yellow-500 ';
      break;
    case 'high':
      statusStyles += ' bg-red-500 ';
      break;
    default:
      statusStyles += ' bg-slate-600 ';
  }

  return (
    <div
      className={`${statusStyles} w-full ${className} uppercase text-xs px-1 text-center py-1 shadow-md  text-white rounded-3xl`}
    >
      {priority}
    </div>
  );
}

StatusPill.propTypes = {
  priority: PropTypes.string.isRequired,
  className: PropTypes.string,
};
