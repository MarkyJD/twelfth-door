import PropTypes from 'prop-types';
import { useState } from 'react';
import { BiPlus, BiCheck } from 'react-icons/bi';

export default function FloatingButton({
  isEditorOpen,
  isValidPost,
  handlePost,
  toggleEditor,
  contentForMobile,
}) {
  const handleFABClick = () => {
    if (isValidPost) {
      handlePost(contentForMobile);
    }
    if (!isEditorOpen) {
      toggleEditor(true);
    }
  };

  let styles =
    ' fixed shadow-lg  flex items-center justify-center bottom-8 right-8 h-16 w-16 rounded-full md:hidden ';

  if (isEditorOpen) {
    if (isValidPost) {
      styles +=
        ' bg-green-800 hover:bg-green-900 shadow-gray-600 dark:shadow-gray-800 ';
    } else {
      styles += ' bg-gray-500  dark:shadow-gray-800 ';
    }
  } else {
    styles +=
      ' hover:bg-blue-800 cursor-pointer bg-blue-700 shadow-slate-400 dark:shadow-slate-800 ';
  }

  return (
    <button onClick={handleFABClick} type="button" className={styles}>
      {isEditorOpen ? (
        <BiCheck
          className={`icon ${isValidPost ? ' text-white' : ' text-gray-400'}`}
        />
      ) : (
        <BiPlus className="icon text-white" />
      )}
    </button>
  );
}

FloatingButton.propTypes = {
  isEditorOpen: PropTypes.bool,
  isValidPost: PropTypes.bool,
  handlePost: PropTypes.func,
  toggleEditor: PropTypes.func,
  contentForMobile: PropTypes.object.isRequired,
};
