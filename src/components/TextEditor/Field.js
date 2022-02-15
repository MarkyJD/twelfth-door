/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';

export default function Field({
  children,
  focus = false,
  label,
  className,
  required = false,
}) {
  return (
    <div
      className={`${className} w-full border-b my-1 ${
        focus
          ? ' border-blue-400 dark:border-blue-300'
          : ' border-slate-300 dark:border-slate-600'
      }`}
    >
      <div className="px-3 md:px-0 max-w-screen-md mx-auto">
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {required ? `*${label}` : label}
          {children}
        </label>
      </div>
    </div>
  );
}

Field.propTypes = {
  children: PropTypes.node.isRequired,
  focus: PropTypes.bool,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
};
