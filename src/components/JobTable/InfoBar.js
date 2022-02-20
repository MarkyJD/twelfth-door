import PropTypes from 'prop-types';
import JobInfo from './JobInfo';
import JobOverview from './JobOverview';

export default function InfoBar({ activeJob, jobInfo }) {
  if (activeJob) {
    return <JobInfo activeJob={activeJob} />;
  }
  return <JobOverview jobInfo={jobInfo} />;
}

InfoBar.propTypes = {
  activeJob: PropTypes.object,
  jobInfo: PropTypes.array,
};
