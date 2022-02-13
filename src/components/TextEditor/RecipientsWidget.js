import PropTypes from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';
import Field from './Field';

function upperFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default function RecipientsWidget({
  name,
  label,
  value,
  onChange,
  options,
}) {
  const [focus, setFocus] = useState();
  const users = [
    {
      value: '@everyone',
      label: 'everyone',
    },
  ];
  options.forEach((user) => {
    users.push({
      value: user.username,
      label: user.username,
    });
  });

  return (
    <Field focus={focus} label={label} setFocus={setFocus}>
      <Select
        className="border-none"
        options={users}
        defaultValue={[users[0]]}
        isMulti
        closeMenuOnSelect={false}
      />
    </Field>
  );
}

RecipientsWidget.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
