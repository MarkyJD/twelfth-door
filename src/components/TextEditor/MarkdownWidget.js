/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import isHotkey from 'is-hotkey';
import {
  FaBold,
  FaUnderline,
  FaItalic,
  FaQuoteRight,
  FaListUl,
  FaListOl,
  FaHeading,
  FaCode,
} from 'react-icons/fa';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import ToolbarItem from './ToolbarItem';
import Toolbar from './Toolbar';
import Field from './Field';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

function isBlockActive(editor, format) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
}

function toggleBlock(editor, format) {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

function isMarkActive(editor, format) {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

function toggleMark(editor, format) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function Element({ attributes, children, element }) {
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          className="p-4 text-slate-600 dark:text-slate-400"
          {...attributes}
        >
          <span className="text-slate-400 dark:text-slate-600 text-3xl">
            {'| '}
          </span>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul className="list-disc ml-8 pl-4" {...attributes}>
          {children}
        </ul>
      );
    case 'heading':
      return (
        <h1
          className="text-2xl text-shadow-sm py-1 text-slate-700 dark:text-slate-300"
          {...attributes}
        >
          {children}
        </h1>
      );
    case 'list-item':
      return (
        <li className="list-item pl-4" {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol className="list-decimal ml-8 pl-4" {...attributes}>
          {children}
        </ol>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}

export function Leaf({ attributes, children, leaf }) {
  let output = children;
  if (leaf.bold) {
    output = <strong>{children}</strong>;
  }

  if (leaf.placeholder) {
    output = (
      <span className="text-gray-400 dark:text-gray-600" {...attributes}>
        {children}
      </span>
    );
  }

  if (leaf.code) {
    output = (
      <code className="rounded block my-2 p-2 bg-gray-200 dark:bg-gray-800">
        {children}
      </code>
    );
  }

  if (leaf.italic) {
    output = <em>{children}</em>;
  }

  if (leaf.underline) {
    output = <u>{children}</u>;
  }

  return <span {...attributes}>{output}</span>;
}

export default function MarkdownWidget({
  onChange,
  name,
  readOnly = false,
  rawContent,
  label,
  required = false,
}) {
  const [focus, setFocus] = useState(false);
  const [content, setContent] = useState(null);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (rawContent && readOnly) {
      setContent(JSON.parse(rawContent));
    } else {
      setContent([{ children: [{ text: '' }], type: 'paragraph' }]);
    }
  }, []);

  return (
    content && (
      <Field focus={focus} label={label} required={required}>
        <Slate
          className="static"
          editor={editor}
          value={content}
          onChange={(v) => {
            if (!readOnly) {
              onChange(v);
            }
          }}
        >
          {!readOnly && (
            <Toolbar>
              <ToolbarItem
                className="editorIcon mark"
                active={isMarkActive(editor, 'bold')}
                Icon={FaBold}
                format="bold"
                onClick={(event) => {
                  const format = 'bold';
                  event.preventDefault();
                  toggleMark(editor, format);
                  document.getElementById('editable').focus();
                }}
              />
              <ToolbarItem
                className="editorIcon mark"
                active={isMarkActive(editor, 'italic')}
                Icon={FaItalic}
                format="italic"
                onClick={(event) => {
                  const format = 'italic';
                  event.preventDefault();
                  toggleMark(editor, format);
                  document.getElementById('editable').focus();
                }}
              />
              <ToolbarItem
                className="editorIcon mark"
                active={isMarkActive(editor, 'underline')}
                Icon={FaUnderline}
                format="underline"
                onClick={(event) => {
                  const format = 'underline';
                  event.preventDefault();
                  toggleMark(editor, format);
                  document.getElementById('editable').focus();
                }}
              />
              <ToolbarItem
                className="editorIcon mark"
                active={isMarkActive(editor, 'code')}
                Icon={FaCode}
                format="code"
                onClick={(event) => {
                  const format = 'code';
                  event.preventDefault();
                  toggleMark(editor, format);
                  document.getElementById('editable').focus();
                }}
              />

              <ToolbarItem
                className="editorIcon eblock"
                active={isBlockActive(editor, 'heading')}
                Icon={FaHeading}
                format="heading"
                onClick={(event) => {
                  const format = 'heading';
                  event.preventDefault();
                  toggleBlock(editor, format);
                  document.getElementById('editable').focus();
                }}
              />
              <ToolbarItem
                className="editorIcon eblock"
                active={isBlockActive(editor, 'block-quote')}
                Icon={FaQuoteRight}
                format="block-quote"
                onClick={(event) => {
                  const format = 'block-quote';
                  event.preventDefault();
                  toggleBlock(editor, format);
                  document.getElementById('editable').focus();
                }}
              />
              <ToolbarItem
                className="editorIcon eblock"
                active={isBlockActive(editor, 'numbered-list')}
                Icon={FaListOl}
                format="numbered-list"
                onClick={(event) => {
                  const format = 'numbered-list';
                  event.preventDefault();
                  toggleBlock(editor, format);
                  document.getElementById('editable').focus();
                }}
              />
              <ToolbarItem
                className="editorIcon eblock"
                active={isBlockActive(editor, 'bulleted-list')}
                Icon={FaListUl}
                format="bulleted-list"
                onClick={(event) => {
                  const format = 'bulleted-list';
                  event.preventDefault();
                  toggleBlock(editor, format);
                  document.getElementById('editable').focus();
                }}
              />
            </Toolbar>
          )}
          <div className="static w-full py-2 min-h-[10rem]">
            <Editable
              id="editable"
              readOnly={readOnly}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className=" static after:text-lg block placeholder:text-blue-500 min-h-[10rem] hover:cursor-text font-normal
             text-slate-800 dark:text-slate-100"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              spellCheck
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
          </div>
        </Slate>
      </Field>
    )
  );
}

MarkdownWidget.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  rawContent: PropTypes.string,
};
