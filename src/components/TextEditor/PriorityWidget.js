import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Field from './Field';

const customStyles = {
  control: (provided, state) => ({
    backgroundColor: 'transparent',
    display: 'flex',
    color: '#bfc4cb',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontWeight: '400',
  }),
};

export default function PriorityWidget({
  name,
  label,
  onChange,
  options,
  required = false,
}) {
  const [focus, setFocus] = useState();
  const priorities = [];
  options.forEach((priority) => {
    priorities.push({
      value: priority,
      label: priority,
    });
  });

  const handleSelect = (selected) => {
    onChange(selected.value);
    return selected;
  };

  return (
    <Field focus={focus} label={label} required={required}>
      <Select
        className="text-slate-900 font-normal ml-[-10px] relative z-40 "
        options={priorities}
        tabSelectsValue={false}
        styles={customStyles}
        onMenuOpen={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(value) => handleSelect(value)}
        placeholder={name}
      />
    </Field>
  );
}

PriorityWidget.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
};
