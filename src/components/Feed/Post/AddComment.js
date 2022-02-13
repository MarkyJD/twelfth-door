import PropTypes from 'prop-types';
import { useState } from 'react';

export default function AddComment({ addComment, commentInput }) {
  const [reply, setReply] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply) {
      addComment(reply);
      setReply('');
    }
  };

  return (
    <form
      className="container flex items-center justify-between"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter your reply..."
        ref={commentInput}
        value={reply}
        className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-r-0 border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded-l mt-5 mb-3"
        onChange={({ target: { value } }) => setReply(value)}
      />
      <button
        className="text-sm font-bold flex items-center text-white bg-blue-600 dark:bg-blue-600  hover:bg-blue-700 dark:hover:bg-blue-500 py-5 px-4 h-2 border border-l-0  border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded-r mt-5 mb-3"
        type="button"
        onClick={handleSubmit}
      >
        Post
      </button>
    </form>
  );
}

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
