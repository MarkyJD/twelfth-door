import PropTypes from 'prop-types';

export default function Footer({ onClick, label }) {
  return (
    <button
      type="button"
      className="font-bold text-sm text-white py-2 px-3 bg-slate-600 dark:bg-slate-600  hover:bg-slate-700 dark:hover:bg-slate-500 border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded"
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
}

Footer.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
