import PropTypes from 'prop-types';

export default function JobOverview({ jobOverviewData }) {
  console.log(jobOverviewData);
  return (
    <div>
      <p>hell</p>
    </div>
  );
}

JobOverview.propTypes = {
  jobOverviewData: PropTypes.array.isRequired,
};
