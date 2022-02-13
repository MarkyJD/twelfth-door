import { useState, useEffect } from 'react';
import DebugWidget from './DebugWidget';
import MarkdownWidget from './MarkdownWidget';
import TextWidget from './TextWidget';
import RecipientsWidget from './RecipientsWidget';
import { getAllUsers } from '../../services/firebase-services';

export default function TextEditor() {
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
      <>
        <TextWidget
          title
          name="Enter a title or subject"
          label="title"
          value={entry.title}
          onChange={(title) => updateValue({ title })}
        />
        <TextWidget
          name="(optional) Enter a subtitle"
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
        <MarkdownWidget />
        {debug && <DebugWidget data={entry} />}
      </>
    )
  );
}
