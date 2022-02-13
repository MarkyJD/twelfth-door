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

export default function RecipientsWidget({ name, label, onChange, options }) {
  const [focus, setFocus] = useState();
  const users = [
    {
      value: '@everyone',
      label: 'everyone',
    },
  ];

  useEffect(() => {
    onChange(users);
  }, []);

  options
    .sort((a, b) => a.username.localeCompare(b.username))
    .forEach((user) => {
      users.push({
        value: user.username,
        label: user.username,
      });
    });

  return (
    <Field focus={focus} label={label} setFocus={setFocus}>
      <Select
        className="text-slate-900 font-normal ml-[-10px] "
        options={users}
        defaultValue={[users[0]]}
        isMulti
        closeMenuOnSelect={false}
        styles={customStyles}
        onMenuOpen={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(value) => onChange(value)}
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
};
