/* eslint-disable */

import PropTypes from 'prop-types';

export default function Post({ message: { author, comments, content, dateCreated, recipients, userId } }) {
  return (
    <div>
      <p>Hi</p>
    </div>
  );
}

Post.propTypes = {
  message: PropTypes.shape({
    author: PropTypes.string.isRequired,
    comments: PropTypes.array,
    content: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    recipients: PropTypes.array,
    userId: PropTypes.string.isRequired,
  }),
};
