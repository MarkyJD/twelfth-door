import PropTypes from 'prop-types';
import { formatDistance, parseISO, format } from 'date-fns';

export default function Header({ author, subject, dateCreated, subtitle }) {
  const date = new Date(dateCreated);

  return (
    <div className="flex justify-between mb-2">
      <div className="flex flex-col ">
        <div className="flex space-x-2 items-center">
          <p className="font-extrabold text-lg font-mono text-darkBlue-200 dark:text-lightBlue-100">
            {author}
          </p>
          <p className="text-xs font-light ">
            {formatDistance(parseISO(date.toISOString()), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
        <p className="font-bold text-lg text-slate-600 dark:text-slate-300">
          {subject}
        </p>
        {subtitle && (
          <p className=" text-slate-500 dark:text-slate-400 text-sm">
            {subtitle}
          </p>
        )}
      </div>

      <p className="text-xs font-semibold text-darkGray-100">
        {format(date, 'dd/MM/yyyy')}
      </p>
    </div>
  );
}

Header.propTypes = {
  subject: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  dateCreated: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};
