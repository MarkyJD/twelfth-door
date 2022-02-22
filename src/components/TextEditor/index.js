import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BiX } from 'react-icons/bi';

import DebugWidget from './DebugWidget';
import MarkdownWidget from './MarkdownWidget';
import TextWidget from './TextWidget';
import RecipientsWidget from './RecipientsWidget';
import SelectWidget from './SelectWidget';
import { departments, tags, priorities } from '../../constants/Options';
import { getAllUsers } from '../../services/firebase-services';
import TagsWidget from './TagsWidget';
import PriorityWidget from './PriorityWidget';

export default function TextEditor({
  mode = 'message',
  handlePost,
  toggleEditor,
  isEditorOpenOnMobile,
  setFAB,
  setContentForMobile,
}) {
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState({
    entry: {},
    debug: false,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const results = await getAllUsers();
      setUsers([...results]);
    }

    getUsers();
  }, []);

  useEffect(() => {
    const { entry } = value;

    if (mode === 'message') {
      if (entry.title && entry.recipients && entry.body) {
        if (entry.recipients.length >= 1) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }

      if (isEditorOpenOnMobile) {
        setFAB(isValid);
      }
    }

    if (mode === 'job') {
      if (entry.title && entry.responsible && entry.department) {
        if (entry.responsible !== '' && entry.department.length >= 1) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }

      if (isEditorOpenOnMobile) {
        setFAB(isValid);
      }
    }
  }, [value]);

  const updateValue = (newValue) => {
    setValue((prev) => ({
      ...prev,
      entry: {
        ...prev.entry,
        ...newValue,
      },
    }));

    setContentForMobile(value);
  };

  const handleDiscard = () => {
    setValue({
      entry: {},
      debug: false,
    });
    toggleEditor(isEditorOpenOnMobile);
  };

  const { debug, entry } = value;

  if (mode === 'message') {
    return (
      users && (
        <div className="h-full overflow-auto ">
          <div className="w-full h-14 pt-2 px-2 bg-slate-700 rounded">
            <div className="py-1 mb-1 max-w-screen-md mx-auto flex items-center justify-between">
              <p className="text-xl font-thin font-title text-blue-400 dark:text-blue-500 text-shadow-none">
                Create Message
              </p>
              <BiX
                className="icon text-white hover:bg-slate-500 rounded"
                onClick={() => toggleEditor(isEditorOpenOnMobile)}
              />
            </div>
          </div>
          <hr />

          <TextWidget
            title
            required
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
            required
            name="Search people"
            label="recipients"
            value={entry.recipients}
            onChange={(recipients) => updateValue({ recipients })}
            options={users}
          />
          <MarkdownWidget
            name="Enter you message"
            label="body"
            onChange={(body) => updateValue({ body })}
            required
          />
          <div className="mt-2 flex justify-center md:justify-between max-w-screen-md mx-auto">
            <button
              type="button"
              className="font-bold text-sm w-24 text-white py-2 px-3 bg-red-700 dark:bg-red-600  hover:bg-red-800 dark:hover:bg-red-800 border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded"
              onClick={handleDiscard}
            >
              Discard
            </button>
            <button
              type="button"
              disabled={!isValid}
              className={`hidden md:block font-bold text-sm w-24 text-white py-2 px-3 bg-green-700 dark:bg-green-600   border-lightGray-400 dark:border-darkGray-400 outline-lightGreen-200 rounded ${
                isValid
                  ? ' hover:bg-green-800 dark:hover:bg-green-700'
                  : ' opacity-40'
              }`}
              onClick={() => handlePost(value)}
            >
              Post
            </button>
          </div>
          {debug && <DebugWidget data={entry.body} />}
        </div>
      )
    );
  }

  if (mode === 'job') {
    return (
      users && (
        <div className="h-full overflow-auto ">
          <div className="w-full h-14 pt-2 px-2 bg-slate-700 rounded">
            <div className="py-1 mb-1 max-w-screen-md mx-auto flex items-center justify-between">
              <p className="text-xl font-thin font-title text-blue-200 dark:text-blue-500 text-shadow-none">
                Create Job
              </p>
              <BiX
                className="icon text-white hover:bg-slate-500 rounded"
                onClick={() => toggleEditor(isEditorOpenOnMobile)}
              />
            </div>
          </div>
          <hr />

          <TextWidget
            title
            required
            name="Enter a title or subject"
            label="title"
            value={entry.title}
            onChange={(title) => updateValue({ title })}
          />

          <PriorityWidget
            required
            name="Select a Priority level"
            label="priority"
            value={entry.priority}
            onChange={(priority) => updateValue({ priority })}
            options={priorities}
          />
          <SelectWidget
            required
            name="Choose Department"
            label="department"
            value={entry.department}
            onChange={(department) => updateValue({ department })}
            options={departments}
          />

          <RecipientsWidget
            required
            mode={mode}
            name="Search people"
            label="assign to"
            value={entry.responsible}
            onChange={(responsible) => updateValue({ responsible })}
            options={users}
          />

          <TagsWidget
            name="Choose tags OR Create new Tag"
            label="tags"
            value={entry.tags}
            onChange={(tags) => updateValue({ tags })}
            options={tags}
          />

          <TextWidget
            className="h-[10rem]"
            name="Enter a brief description"
            label="description"
            value={entry.description}
            onChange={(description) => updateValue({ description })}
          />

          <div className="mt-2 flex justify-center md:justify-between max-w-screen-md mx-auto">
            <button
              type="button"
              className="font-bold text-sm w-24 text-white py-2 px-3 bg-red-700 dark:bg-red-600  hover:bg-red-800 dark:hover:bg-red-800 border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded"
              onClick={handleDiscard}
            >
              Discard
            </button>
            <button
              type="button"
              disabled={!isValid}
              className={`hidden md:block font-bold text-sm w-24 text-white py-2 px-3 bg-green-700 dark:bg-green-600   border-lightGray-400 dark:border-darkGray-400 outline-lightGreen-200 rounded ${
                isValid
                  ? ' hover:bg-green-800 dark:hover:bg-green-700'
                  : ' opacity-40'
              }`}
              onClick={() => handlePost(value)}
            >
              Add
            </button>
          </div>
          {debug && <DebugWidget data={entry.body} />}
        </div>
      )
    );
  }

  return null;
}

TextEditor.propTypes = {
  handlePost: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  isEditorOpenOnMobile: PropTypes.bool.isRequired,
  setContentForMobile: PropTypes.func.isRequired,
  setFAB: PropTypes.func,
  mode: PropTypes.string,
};
