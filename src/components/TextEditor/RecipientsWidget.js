import PropTypes from 'prop-types';
import { useState } from 'react';
import Field from './Field';

export default function RecipientsWidget({
  name,
  label,
  value,
  onChange,
  options,
}) {
  const [focus, setFocus] = useState();

  return (
    <Field focus={focus} label={label} setFocus={setFocus}>
      <select>
        {options.map((opt) => (
          <option key={opt.userId}>{opt.username}</option>
        ))}
      </select>
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
