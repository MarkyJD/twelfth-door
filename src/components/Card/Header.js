import PropTypes from 'prop-types';

export default function Header({ title }) {
  return (
    <header>
      <h2 className="font-semibold text-slate-500">{title}</h2>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
