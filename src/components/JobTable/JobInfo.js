import { format, formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import StatusPill from './StatusPill';
import Tag from './Tag';

export default function JobInfo({ activeJob }) {
  const {
    comments,
    dateCreated,
    department,
    description,
    docId,
    jobNo,
    priority,
    requestedBy,
    responsible,
    status,
    tags,
    title,
  } = activeJob;

  return (
    <div className="w-full p-3">
      <p className="font-serif mb-3 text-semibold text-lg p-2 text-white bg-slate-700 rounded shadow">
        {`Job #${jobNo} | `}
        <span className="text-xs font-sans">
          {formatDistance(new Date(dateCreated), new Date(), {
            addSuffix: true,
          })}
        </span>
      </p>

      <p className="font-bold text-lg text-slate-600 dark:text-slate-300">
        {title}
      </p>

      <p className="font-semibold mb-3 flex flex-wrap">
        {tags.map((tag, i) => (
          <Tag key={i} tag={tag} />
        ))}
      </p>

      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Description: <span className="font-normal">{description}</span>
      </p>

      <div className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Priority: <StatusPill className="inline" priority={priority} />
      </div>

      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Status: <span className="font-normal">{status}</span>
      </p>

      <p className="font-serif mb-3 text-semibold text-lg p-2 text-white bg-slate-700 rounded shadow">
        Details
      </p>

      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Department: <span className="font-normal">{department}</span>
      </p>

      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Requested By: <span className="font-normal">{requestedBy}</span>
      </p>

      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Responsible: <span className="font-normal">{responsible}</span>
      </p>

      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Job Id: <span className="font-normal">{jobNo}</span>
      </p>

      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">
        Date Created:{' '}
        <span className="font-normal">
          {format(new Date(dateCreated), 'HH:mm:ss dd/MM/yyyy')}
        </span>
      </p>

      <p className="font-serif mb-3 text-semibold text-lg p-2 text-white bg-slate-700 rounded shadow">
        Comments
      </p>

      {comments.map((comment, i) => (
        <div
          className="mx-4 pb-2 text-sm border-b"
          key={`${i}-${comment.dateCreated}`}
        >
          <p className="font-bold">
            {comment.username}{' '}
            <span className="font-normal">
              {formatDistance(new Date(comment.dateCreated), new Date(), {
                addSuffix: true,
              })}
            </span>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}

JobInfo.propTypes = {
  activeJob: PropTypes.object,
};
