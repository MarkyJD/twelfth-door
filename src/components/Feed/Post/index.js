import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Actions from './Actions';
import Comments from './Comments';
import useUser from '../../../hooks/useUser';

export default function Post({
  message: {
    subject,
    author,
    comments,
    content,
    dateCreated,
    recipients,
    userId,
    docId,
  },
}) {
  const { user } = useUser();
  const commentInput = useRef(null);
  const [inputOpen, setInputOpen] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [numComments, setNumComments] = useState(comments.length);

  const updateNumComments = () => {
    setNumComments((prev) => prev + 1);
  };

  const handleFocus = () => {
    setInputOpen((prev) => !prev);
  };

  useEffect(() => {
    if (inputOpen && commentInput.current) {
      commentInput.current.focus();
    }
  }, [inputOpen, commentInput]);

  if (user?.username) {
    return (
      <div className="container p-3 rounded mb-3 shadow bg-white dark:bg-darkGray-500">
        <Header author={author} subject={subject} dateCreated={dateCreated} />
        <p className="text-md text-slate-700 dark:text-slate-100">{content}</p>
        <Actions
          setCommentsExpanded={setCommentsExpanded}
          numComments={numComments}
          handleFocus={handleFocus}
        />
        <Comments
          comments={comments}
          commentsExpanded={commentsExpanded}
          setCommentsExpanded={setCommentsExpanded}
          commentInput={commentInput}
          docId={docId}
          username={user.username}
          inputOpen={inputOpen}
          updateNumComments={updateNumComments}
        />
        <div className="w-full mx-auto mt-3 border-b border-slate-200 dark:border-slate-700" />
      </div>
    );
  }
  return <p>Loading...</p>;
}

Post.propTypes = {
  message: PropTypes.shape({
    subject: PropTypes.string,
    author: PropTypes.string,
    comments: PropTypes.array,
    content: PropTypes.string,
    dateCreated: PropTypes.number,
    recipients: PropTypes.array,
    userId: PropTypes.string,
    docId: PropTypes.string,
  }).isRequired,
};
