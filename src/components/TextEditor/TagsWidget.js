import PropTypes from 'prop-types';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
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

export default function TagsWidget({
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
      <CreatableSelect
        className="text-slate-900 font-normal ml-[-10px] relative z-10"
        options={departments}
        isMulti
        closeMenuOnSelect={false}
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

TagsWidget.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
};
