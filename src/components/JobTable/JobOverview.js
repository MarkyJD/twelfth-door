import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useUser from '../../hooks/useUser';
import StatusPill from './StatusPill';

export default function JobOverview({ jobOverviewData }) {
  const { user } = useUser();
  const [counts, setCounts] = useState({
    high: 0,
    medium: 0,
    low: 0,
    total: jobOverviewData.length,
  });
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    if (user?.username) {
      const responsible = [];
      const requestedBy = [];
      let numHigh = 0;
      let numMed = 0;
      let numLow = 0;

      jobOverviewData.forEach((job) => {
        if (job.priority === 'high') {
          numHigh += 1;
        }

        if (job.priority === 'medium') {
          numMed += 1;
        }

        if (job.priority === 'low') {
          numLow += 1;
        }

        if (job.responsible === user.username) {
          responsible.push(job);
        }

        if (job.requestedBy === user.username) {
          requestedBy.push(job);
        }
      });

      setCounts((prev) => ({
        ...prev,
        high: numHigh,
        medium: numMed,
        low: numLow,
      }));
    }
  }, [user?.username]);

  return (
    <div className="w-full p-3">
      <p className="font-serif mb-3 text-semibold text-lg p-2 text-white bg-slate-700 rounded shadow">
        Job Overview
      </p>
      {/* {console.log(myJobs)} */}
      <p className="font-serif text-semibold text-lg">Number of Jobs</p>
      <div className="border-b border-slate-300 mb-3" />
      <table className="table-auto border rounded">
        <thead>
          <tr className="uppercase h-10 text-white bg-slate-500">
            <th className="p-3 text-sm font-semibold text-left">Priority</th>
            <th className="p-3 text-sm font-semibold text-center w-36">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="font-semibold p-2">
              <StatusPill priority="high" />
            </td>
            <td className="font-semibold p-2 text-center">{counts.high}</td>
          </tr>
          <tr className="">
            <td className="font-semibold p-2">
              <StatusPill priority="medium" />
            </td>
            <td className="font-semibold text-center p-2">{counts.medium}</td>
          </tr>
          <tr>
            <td className="font-semibold p-2">
              <StatusPill priority="low" />
            </td>
            <td className="font-semibold p-2 text-center">{counts.low}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="uppercase h-10 text-slate-900 bg-slate-200">
            <th className="p-3 text-sm font-semibold text-left">Total</th>
            <th className="p-3 text-sm font-semibold text-center w-36">
              {counts.total}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

JobOverview.propTypes = {
  jobOverviewData: PropTypes.array.isRequired,
};
