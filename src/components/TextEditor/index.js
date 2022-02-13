/* eslint-disable */
import { useCallback, useMemo, useState } from 'react';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

export default function TextEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph' }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  });

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  });

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case '`': {
                event.preventDefault();
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.type === 'code',
                });
                Transforms.setNodes(
                  editor,
                  { type: match ? null : 'code' },
                  { match: (n) => Editor.isBlock(editor, n) }
                );
                break;
              }

              case 'b': {
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  { bold: true },
                  { match: (n) => Text.isText(n), split: true }
                );
                break;
              }
            }
          }}
        />
      </Slate>
    </>
  );
}

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
  console.log('this fired');
  return (
    <span
      {...props.attributes}
      className={`${props.leaf.bold ? ' font-bold' : ' font-normal'}`}
    >
      {props.children}
    </span>
  );
};
