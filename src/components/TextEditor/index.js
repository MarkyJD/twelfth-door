import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BiX } from 'react-icons/bi';
import DebugWidget from './DebugWidget';
import MarkdownWidget from './MarkdownWidget';
import TextWidget from './TextWidget';
import RecipientsWidget from './RecipientsWidget';
import { getAllUsers } from '../../services/firebase-services';

export default function TextEditor({ toggleEditor, isEditorOpenOnMobile }) {
  const [value, setValue] = useState({
    entry: {},
    debug: true,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const results = await getAllUsers();
      setUsers([...results]);
    }

    getUsers();
  }, []);

  const updateValue = (newValue) => {
    setValue((prev) => ({
      ...prev,
      entry: {
        ...prev.entry,
        ...newValue,
      },
    }));
  };

  const { debug, entry } = value;

  return (
    users && (
      <div className="h-full overflow-auto">
        <div className="py-1 mb-1 px-5 mx-auto flex items-center justify-between h-100 overflow-auto">
          <h2 className="text-xl font-thin font-title text-slate-800 dark:text-slate-200 text-shadow-none">
            Whats on your mind?
          </h2>
          <BiX
            className="icon text-black dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
            onClick={() => toggleEditor(isEditorOpenOnMobile)}
          />
        </div>
        <hr />

        <TextWidget
          title
          name="Enter a title or subject"
          label="title"
          value={entry.title}
          onChange={(title) => updateValue({ title })}
        />
        <TextWidget
          name="Enter a subtitle (optional)"
          label="subtitle"
          value={entry.subtitle}
          onChange={(subtitle) => updateValue({ subtitle })}
        />
        <RecipientsWidget
          name="Search people"
          label="Recipients"
          value={entry.recipients}
          onChange={(recipients) => updateValue({ recipients })}
          options={users}
        />
        <MarkdownWidget onChange={(body) => updateValue({ body })} />
        {debug && <DebugWidget data={entry} />}
      </div>
    )
  );
}

TextEditor.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
  isEditorOpenOnMobile: PropTypes.bool.isRequired,
};
