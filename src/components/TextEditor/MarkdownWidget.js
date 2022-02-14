/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
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
  Descendant,
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

function Element({ attributes, children, element }) {
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          className="p-4 font-bold text-slate-600 dark:text-slate-400"
          {...attributes}
        >
          <span className="text-blue-400 dark:text-blue-800 text-xl">
            {'| '}
          </span>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul className="list-disc pl-4" {...attributes}>
          {children}
        </ul>
      );
    case 'heading':
      return (
        <h1 className="text-lg text-shadow-sm font-semibold" {...attributes}>
          {children}
        </h1>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return (
        <ol className="list-decimal pl-4" {...attributes}>
          {children}
        </ol>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}

function Leaf({ attributes, children, leaf }) {
  let output = children;
  if (leaf.bold) {
    output = <strong>{children}</strong>;
  }

  if (leaf.code) {
    output = <code>{children}</code>;
  }

  if (leaf.italic) {
    output = <em>{children}</em>;
  }

  if (leaf.underline) {
    output = <u>{children}</u>;
  }

  return <span {...attributes}>{output}</span>;
}

export default function MarkdownWidget({ onChange }) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState([
    {
      children: [{ text: '' }],
    },
  ]);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Field focus={focus} label="body" className="">
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);
          onChange(value);
        }}
      >
        <Toolbar>
          <ToolbarItem
            className="editorIcon mark"
            active={isMarkActive(editor, 'bold')}
            Icon={FaBold}
            format="bold"
            onClick={(event) => {
              const format = 'bold';
              event.preventDefault();
              event.stopPropagation();
              toggleMark(editor, format);
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
              event.stopPropagation();
              toggleMark(editor, format);
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
              event.stopPropagation();
              toggleMark(editor, format);
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
              event.stopPropagation();
              toggleMark(editor, format);
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
              event.stopPropagation();
              toggleBlock(editor, format);
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
              event.stopPropagation();
              toggleBlock(editor, format);
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
              event.stopPropagation();
              toggleBlock(editor, format);
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
              event.stopPropagation();
              toggleBlock(editor, format);
            }}
          />
        </Toolbar>
        <div className="w-full py-2 min-h-[12rem]">
          <Editable
            className="text-md font-normal min-h-[12rem] text-slate-800 dark:text-slate-100"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter your message here"
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
  );
}

MarkdownWidget.propTypes = {
  onChange: PropTypes.func.isRequired,
};
