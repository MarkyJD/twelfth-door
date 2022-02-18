import PropTypes from 'prop-types';
import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiStrikethrough,
  BiCode,
  BiHeading,
  BiListUl,
  BiListOl,
  Bi,
} from 'react-icons/bi';
import { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MarkdownStyles.css';
import Field from './Field';

export default function MarkdownWidget({
  onChange,
  name,
  readOnly = false,
  rawContent,
  label,
  required = false,
}) {
  const [focus, setFocus] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const [contentState, setContentState] = useState(convertFromRaw(content));
  const toolbarOptions = {
    options: [
      'inline',
      'blockType',
      'list',
      'textAlign',
      'link',
      'image',
      'history',
    ],
    inline: {
      inDropdown: false,
      className: 'iconsClass',
      component: undefined,
      dropdownClassName: undefined,
      options: ['bold', 'italic', 'underline', 'strikethrough'],
    },
    blockType: {
      options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
    },
  };

  const createMarkup = (rawContent) => {
    const content = convertFromRaw(JSON.parse(rawContent));
    const html = convertToHTML(content);
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <Field focus={focus} label={label}>
      <Editor
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        editorState={editorState}
        onEditorStateChange={(state) => setEditorState(state)}
        onChange={() =>
          onChange(
            JSON.stringify(convertToRaw(editorState.getCurrentContent()))
          )
        }
        toolbar={toolbarOptions}
        toolbarClassName="toolbarClass"
        editorClassName="editorClass"
        wrapperClassName="wrapperClass"
      />
    </Field>
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
