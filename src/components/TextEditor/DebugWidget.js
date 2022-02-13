import PropTypes from 'prop-types';

export default function DebugWidget({ data }) {
  return <div className="w-1/2 mx-auto">{JSON.stringify(data, null, 2)}</div>;
}

DebugWidget.propTypes = {
  data: PropTypes.object.isRequired,
};
