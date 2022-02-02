import PropTypes from 'prop-types';
import Header from './Header';
import Actions from './Actions';
// { message: { author, comments, content, dateCreated, recipients, userId }, }
export default function Post() {
  return (
    <div className="container shadow-sm rounded bg-lightGray-600 dark:bg-darkGray-500">
      <Header />
      <p>
        Lorem ipsum dolor sit amet, fugiat cillum consequat velit irure do nulla
        pariatur enim id veniam pariatur esse dolor. Laborum proident elit
        consectetur. Excepteur ullamco cupidatat duis. Esse amet ea voluptate
        proident esse ad consequat quis aliqua minim pariatur.
      </p>
      <Actions />
      <div className="w-full border-b border-slate-500" />
    </div>
  );
}

// Post.propTypes = {
//   message: PropTypes.shape({
//     author: PropTypes.string,
//     comments: PropTypes.array,
//     content: PropTypes.string,
//     dateCreated: PropTypes.string,
//     recipients: PropTypes.array,
//     userId: PropTypes.string,
//   }).isRequired,
// };
