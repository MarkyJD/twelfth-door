import PropTypes from 'prop-types';

export default function Tag({ tag }) {
  return (
    <div className="px-2 py-1 m-1 text-xs rounded shadow-sm font-semibold bg-slate-300">
      #{tag}
    </div>
  );
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};
