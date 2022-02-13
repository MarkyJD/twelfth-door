import PropTypes from 'prop-types';
import { useState } from 'react';
import { BiPlus, BiX } from 'react-icons/bi';

export default function FloatingButton({ handleClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleFABClick = () => {
    setIsActive((prev) => !prev);
    handleClick();
  };

  return (
    <button
      onClick={handleFABClick}
      type="button"
      className={`${
        isActive
          ? ' bg-red-800 hover:bg-red-900 shadow-gray-600 dark:shadow-gray-800 '
          : ' hover:bg-blue-800 cursor-pointer bg-blue-700 shadow-slate-400 dark:shadow-slate-800 '
      } fixed shadow-lg  flex items-center justify-center bottom-8 right-8 h-16 w-16 rounded-full md:hidden`}
    >
      {isActive ? (
        <BiX className="icon text-white" />
      ) : (
        <BiPlus className="icon text-white" />
      )}
    </button>
  );
}

FloatingButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
