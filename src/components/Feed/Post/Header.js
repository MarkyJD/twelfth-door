import PropTypes from 'prop-types';
import { formatDistance, parseISO, format } from 'date-fns';

export default function Header({ author, subject, dateCreated }) {
  const date = new Date(dateCreated);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col ">
        <div className="flex space-x-2 items-center">
          <h2 className="font-extrabold text-lg font-mono text-darkBlue-200 dark:text-lightBlue-100">
            {author}
          </h2>
          <h2 className="text-xs font-light ">
            {formatDistance(parseISO(date.toISOString()), new Date(), {
              addSuffix: true,
            })}
          </h2>
        </div>
        <h2 className="font-semibold text-slate-500 dark:text-slate-400 mb-3">
          {subject}
        </h2>
      </div>

      <h3 className="text-xs font-semibold text-darkGray-100">
        {format(date, 'dd/MM/yyyy')}
      </h3>
    </div>
  );
}

Header.propTypes = {
  subject: PropTypes.string.isRequired,
  dateCreated: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};
