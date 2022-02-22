import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export default function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <input
      className="text-sm text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded "
      value={value || ''}
      placeholder="Search"
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};
