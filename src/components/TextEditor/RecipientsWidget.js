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

export default function RecipientsWidget({
  name,
  label,
  onChange,
  options,
  mode = 'message',
}) {
  const [focus, setFocus] = useState();
  const users =
    mode === 'message'
      ? [
          {
            value: '@everyone',
            label: '@everyone',
          },
          {
            value: '@grounds',
            label: '@grounds',
          },
          {
            value: '@housekeeping',
            label: '@housekeeping',
          },
          {
            value: '@reception',
            label: '@reception',
          },
          {
            value: '@maintenance',
            label: '@maintenance',
          },
          {
            value: '@management',
            label: '@management',
          },
        ]
      : [];

  const handleSelect = (selected) => {
    const lastIndex = selected.length - 1;

    if (
      mode === 'message' &&
      selected[lastIndex] &&
      selected[lastIndex].value.includes('@')
    ) {
      const searchString = selected[lastIndex].value.substring(1);
      let results = options;
      if (searchString !== 'everyone') {
        results = options.filter((user) => user.department === searchString);
      }

      const temp = [];
      results.forEach((user) => {
        temp.push({
          value: user.username,
          label: user.username,
        });
      });

      onChange([...selected, ...temp]);
      return [...selected, ...temp];
    }

    onChange(mode === 'job' ? selected.value : selected);
    return selected;
  };

  // useEffect(() => {
  //   onChange(users);
  // }, []);

  options
    .sort((a, b) => a.username.localeCompare(b.username))
    .forEach((user) => {
      users.push({
        value: user.username,
        label: user.username,
      });
    });

  return (
    <Field focus={focus} label={label} required>
      <Select
        className="text-slate-900 font-normal ml-[-10px] relative z-20"
        options={users}
        isMulti={mode !== 'job'}
        tabSelectsValue={false}
        closeMenuOnSelect={mode === 'job'}
        styles={customStyles}
        onMenuOpen={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(value) => handleSelect(value)}
        placeholder={name}
      />
    </Field>
  );
}

RecipientsWidget.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  mode: PropTypes.string,
};
