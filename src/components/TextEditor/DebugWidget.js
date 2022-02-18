/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { convertToHTML } from 'draft-convert';
import { convertFromRaw } from 'draft-js';
import DOMPurify from 'dompurify';

export default function DebugWidget({ data }) {
  const createMarkup = (rawContent) => {
    const content = convertFromRaw(JSON.parse(rawContent));
    const html = convertToHTML(content);
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (!data) {
    return null;
  }

  return (
    <div
      className="w-full h-full mx-auto"
      dangerouslySetInnerHTML={createMarkup(data)}
    />
  );
}

DebugWidget.propTypes = {
  data: PropTypes.object.isRequired,
};
