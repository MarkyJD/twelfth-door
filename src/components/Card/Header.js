import PropTypes from 'prop-types';

export default function Header({ title }) {
  return (
    <header>
      <p className="text-lg font-semibold text-slate-500">{title}</p>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
