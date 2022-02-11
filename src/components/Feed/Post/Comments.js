import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatDistance } from 'date-fns';
import AddComment from './AddComment';
import { addCommentByDocId } from '../../../services/firebase-services';

export default function Comments({
  comments,
  commentInput,
  commentsExpanded,
  docId,
  username,
  inputOpen,
}) {
  const [localComments, setLocalComments] = useState([...comments]);
  const addComment = async (comment) => {
    const newComment = {
      comment,
      username,
      dateCreated: Date.now(),
    };
    setLocalComments((prev) => [...prev, newComment]);
    await addCommentByDocId(docId, username, comment);
  };

  return (
    <div className="ml-3 p-1 pt-3">
      {commentsExpanded ? (
        localComments.map((comment, i) => (
          <div key={i} className="flex flex-col mb-3 ">
            <h3 className="font-bold text-sm">
              {comment.username}{' '}
              <span className="text-xs font-normal text-slate-500">
                {formatDistance(comment.dateCreated, new Date(), {
                  addSuffix: true,
                })}
              </span>
            </h3>
            <p className="text-sm">{comment.comment}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col mb-3">
          <h3 className="font-bold text-sm">
            {localComments[0].username}{' '}
            <span className="text-xs font-normal text-slate-500">
              {formatDistance(localComments[0].dateCreated, Date.now(), {
                addSuffix: true,
              })}
            </span>
          </h3>
          <p className="text-sm">{localComments[0].comment}</p>
        </div>
      )}
      {inputOpen && (
        <AddComment addComment={addComment} commentInput={commentInput} />
      )}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  commentInput: PropTypes.object.isRequired,
  commentsExpanded: PropTypes.bool.isRequired,
  docId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  inputOpen: PropTypes.bool.isRequired,
};
