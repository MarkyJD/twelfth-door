import PropTypes from 'prop-types';
import Header from './Header';
import Actions from './Actions';

export default function Post({
  message: {
    subject,
    author,
    comments,
    content,
    dateCreated,
    recipients,
    userId,
  },
}) {
  return (
    <div className="container shadow-sm rounded bg-lightGray-600 dark:bg-darkGray-500">
      <Header subject={subject} dateCreated={dateCreated} />
      <p>{content}</p>
      <Actions />
      <div className="w-full border-b border-slate-500" />
    </div>
  );
}

Post.propTypes = {
  message: PropTypes.shape({
    subject: PropTypes.string,
    author: PropTypes.string,
    comments: PropTypes.array,
    content: PropTypes.string,
    dateCreated: PropTypes.string,
    recipients: PropTypes.array,
    userId: PropTypes.string,
  }).isRequired,
};
