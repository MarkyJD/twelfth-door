import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';

export default function Header({ subject, dateCreated }) {
  return (
    <div>
      {console.log(typeof dateCreated)}
      <h2>{subject}</h2>
      <h3>hi</h3>
    </div>
  );
}

Header.propTypes = {
  subject: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
};
