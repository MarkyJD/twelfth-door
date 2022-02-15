import PropTypes from 'prop-types';
import { useState, useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Element, Leaf } from './MarkdownWidget';

export default function ReadOnlyEditor({ content }) {
  const [value, setValue] = useState(JSON.parse(content));
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
}

ReadOnlyEditor.propTypes = {
  content: PropTypes.string.isRequired,
};
