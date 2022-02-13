import PropTypes from 'prop-types';
import { useState } from 'react';
import Field from './Field';

export default function TextWidget({
  title = false,
  name,
  label,
  value,
  onChange,
}) {
  const [focus, setFocus] = useState();

  return (
    <Field focus={focus} label={label} setFocus={setFocus}>
      <input
        type="text"
        className={`h-full bg-transparent w-full py-2 outline-none text-slate-900 dark:text-slate-100 ${
          title ? ' font-bold text-xl' : ' text-lg'
        }`}
        placeholder={name}
        onChange={({ target: { value } }) => onChange(value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value || ''}
      />
    </Field>
  );
}

TextWidget.propTypes = {
  title: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
