import PropTypes from 'prop-types';
import { BiReply, BiCommentDots } from 'react-icons/bi';

export default function Actions({
  numComments,
  handleFocus,
  setCommentsExpanded,
}) {
  const suffix = numComments > 1 ? ' comments' : ' comment';
  return (
    <div className="flex space-x-3 items-center mt-5">
      <button
        type="button"
        onClick={() => setCommentsExpanded((prev) => !prev)}
        className="flex border border-lightGray-500 dark:border-darkGray-300 px-2 py-2 space-x-2 rounded hover:bg-lightGray-500 dark:hover:bg-darkGray-400"
      >
        <BiCommentDots className="inlineIcon" />
        <p className="text-sm font-semibold">{`${numComments} ${suffix}`}</p>
      </button>
      <button
        type="button"
        className="flex space-x-2 border border-lightGray-500 dark:border-darkGray-300 px-2 py-2 rounded hover:bg-lightGray-500 dark:hover:bg-darkGray-400"
        onClick={handleFocus}
      >
        <BiReply className="inlineIcon" />
        <p className="text-sm font-semibold">Reply</p>
      </button>
    </div>
  );
}

Actions.propTypes = {
  numComments: PropTypes.number.isRequired,
  handleFocus: PropTypes.func.isRequired,
  setCommentsExpanded: PropTypes.func.isRequired,
};
