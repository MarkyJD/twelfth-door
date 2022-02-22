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
  option: (provided, { data }) => ({
    ...provided,
    color: data.value.includes('@') ? '#1d4ed8' : '#505663',
  }),
};

export default function SelectWidget({
  name,
  label,
  onChange,
  options,
  required = false,
}) {
  const [focus, setFocus] = useState();
  const departments = [];
  options.forEach((dept) => {
    departments.push({
      value: dept,
      label: dept,
    });
  });

  const handleSelect = (selected) => {
    onChange(selected);
    return selected;
  };

  return (
    <Field focus={focus} label={label} required={required}>
      <Select
        className="text-slate-900 font-normal ml-[-10px] relative z-30"
        options={departments}
        isMulti
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

SelectWidget.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
};
