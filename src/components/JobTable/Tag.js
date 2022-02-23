import PropTypes from 'prop-types';

export default function Tag({ tag }) {
  let classes = '';

  switch (tag) {
    case 'urgent':
    case 'complaint':
    case 'damage':
      classes = ' bg-red-300/50 ';
      break;
    case 'easy':
    case 'clean':
    case 'touch up':
      classes = ' bg-green-300/50 ';
      break;
    case 'safari':
    case 'office':
    case 'cabin':
    case 'grounds':
      classes = ' bg-blue-300/50 ';
      break;
    default:
      classes = ' bg-purple-300/50 ';
  }

  return (
    <div
      className={`${classes} px-2 py-1 m-1 text-xs rounded shadow-sm font-semibold`}
    >
      #{tag}
    </div>
  );
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};
