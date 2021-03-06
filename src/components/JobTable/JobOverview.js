/* eslint-disable no-extend-native */
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import JobTable from '.';
import useUser from '../../hooks/useUser';
import { getNewestJobs } from '../../services/firebase-services';
import StatusPill from './StatusPill';

Date.prototype.sameDay = function (d) {
  return (
    this.getFullYear() === d.getFullYear() &&
    this.getDate() === d.getDate() &&
    this.getMonth() === d.getMonth()
  );
};

export default function JobOverview({ jobOverviewData }) {
  const { user } = useUser();
  const [counts, setCounts] = useState({
    high: 0,
    medium: 0,
    low: 0,
    highToday: 0,
    mediumToday: 0,
    lowToday: 0,
    total: jobOverviewData.length,
  });
  const [myResponsibleJobs, setMyResponsibleJobs] = useState([]);
  const [myRequestedJobs, setMyRequestedJobs] = useState([]);
  const [latestJobs, setLatestJobs] = useState([]);

  useEffect(() => {
    async function getLatestJobs() {
      const results = await getNewestJobs();
      setLatestJobs(results);
    }

    if (user?.username) {
      getLatestJobs();
    }
  }, [user?.username]);

  useEffect(() => {
    if (user?.username) {
      const responsible = [];
      const requestedBy = [];
      let numHigh = 0;
      let numMed = 0;
      let numLow = 0;
      let numHighToday = 0;
      let numMedToday = 0;
      let numLowToday = 0;

      jobOverviewData.forEach((job) => {
        if (job.priority === 'high') {
          numHigh += 1;
          if (new Date(job.dateCreated).sameDay(new Date())) {
            numHighToday += 1;
          }
        }

        if (job.priority === 'medium') {
          numMed += 1;
          if (new Date(job.dateCreated).sameDay(new Date())) {
            numMedToday += 1;
          }
        }

        if (job.priority === 'low') {
          numLow += 1;
          if (new Date(job.dateCreated).sameDay(new Date())) {
            numLowToday += 1;
          }
        }

        if (job.responsible === user.username) {
          responsible.push(job);
        }

        if (job.requestedBy === user.username) {
          requestedBy.push(job);
        }
      });

      setMyRequestedJobs(requestedBy);
      setMyResponsibleJobs(responsible);

      setCounts((prev) => ({
        ...prev,
        high: numHigh,
        medium: numMed,
        low: numLow,
        highToday: numHighToday,
        mediumToday: numMedToday,
        lowToday: numLowToday,
      }));
    }
  }, [user?.username, jobOverviewData]);

  return (
    <div className="w-full p-3">
      <p className="font-serif mb-3 text-semibold text-lg p-2 text-white bg-slate-700 rounded shadow">
        Job Overview
      </p>
      {/* {console.log(myJobs)} */}

      <p className="font-serif text-semibold text-lg">Latest</p>
      <div className="border-b border-slate-300 mb-3" />

      <table className=" table-auto border w-full rounded mb-3 text-xs">
        <thead>
          <tr className="uppercase h-10 text-white bg-slate-500">
            <th className="p-3 text-sm font-semibold text-center">Id</th>
            <th className="p-3 text-sm font-semibold text-center">Priority</th>
            <th className="p-3 text-sm font-semibold text-center">Title</th>
            <th className="p-3 text-sm font-semibold text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          {latestJobs &&
            latestJobs.map((job, i) => {
              const { jobNo: id, priority, title, dateCreated } = job;
              return (
                <tr key={i} className="hover:bg-slate-200 cursor-pointer">
                  <td className="font-semibold p-2 text-center">{id}</td>
                  <td className="font-semibold p-2 flex justify-center ">
                    <StatusPill priority={priority} className="w-14" />
                  </td>
                  <td className="font-semibold p-2 text-center">{title}</td>
                  <td className="font-semibold p-2 text-center">
                    {formatDistance(new Date(dateCreated), new Date(), {
                      addSuffix: true,
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <p className="font-serif text-semibold text-lg">Information</p>
      <div className="border-b border-slate-300 mb-3" />

      {/* Priority / Count Table */}
      <table className=" table-auto border w-full rounded mb-3">
        <thead>
          <tr className="uppercase h-10 text-white bg-slate-500">
            <th className="p-3 text-sm font-semibold text-center">Priority</th>
            <th className="p-3 text-sm font-semibold text-center">Current</th>
            <th className="p-3 text-sm font-semibold text-center">
              Reported Today
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="font-semibold p-2 flex justify-center ">
              <StatusPill priority="high" className="w-14" />
            </td>
            <td className="font-semibold p-2 text-center">{counts.high}</td>
            <td className="font-semibold p-2 text-center">
              {counts.highToday}
            </td>
          </tr>
          <tr className="">
            <td className="font-semibold p-2 flex justify-center">
              <StatusPill priority="medium" className="w-14" />
            </td>
            <td className="font-semibold text-center p-2">{counts.medium}</td>
            <td className="font-semibold text-center p-2">
              {counts.mediumToday}
            </td>
          </tr>
          <tr>
            <td className="font-semibold p-2 flex justify-center">
              <StatusPill priority="low" className="w-14" />
            </td>
            <td className="font-semibold p-2 text-center">{counts.low}</td>
            <td className="font-semibold p-2 text-center">{counts.lowToday}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="uppercase h-10 text-slate-900 bg-slate-200">
            <th className="p-3 text-sm font-semibold">Total</th>
            <th className="p-3 text-sm font-semibold text-center">
              {counts.total}
            </th>
            <th className="p-3 text-sm font-semibold text-center">
              {counts.highToday + counts.mediumToday + counts.lowToday}
            </th>
          </tr>
        </tfoot>
      </table>

      <p className="font-serif text-semibold text-lg">Assigned to Me</p>
      <div className="border-b border-slate-300 mb-3" />

      <table className=" table-auto border w-full rounded mb-3 text-xs">
        <thead>
          <tr className="uppercase h-10 text-white bg-slate-500">
            <th className="p-3 text-sm font-semibold text-center">Id</th>
            <th className="p-3 text-sm font-semibold text-center">Priority</th>
            <th className="p-3 text-sm font-semibold text-center">Title</th>
            <th className="p-3 text-sm font-semibold text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          {[...myResponsibleJobs].map((job, i) => {
            const { jobNo: id, priority, title, dateCreated } = job;
            return (
              <tr key={i} className="hover:bg-slate-200 cursor-pointer">
                <td className="font-semibold p-2 text-center">{id}</td>
                <td className="font-semibold p-2 flex justify-center ">
                  <StatusPill priority={priority} className="w-14" />
                </td>
                <td className="font-semibold p-2 text-center">{title}</td>
                <td className="font-semibold p-2 text-center">
                  {formatDistance(new Date(dateCreated), new Date(), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="font-serif text-semibold text-lg">Reported by Me</p>
      <div className="border-b border-slate-300 mb-3" />

      <table className=" table-auto border w-full rounded mb-3 text-xs">
        <thead>
          <tr className="uppercase h-10 text-white bg-slate-500">
            <th className="p-3 text-sm font-semibold text-center">Id</th>
            <th className="p-3 text-sm font-semibold text-center">Priority</th>
            <th className="p-3 text-sm font-semibold text-center">Title</th>
            <th className="p-3 text-sm font-semibold text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          {[...myRequestedJobs].map((job, i) => {
            const { jobNo: id, priority, title, dateCreated } = job;
            return (
              <tr key={i} className="hover:bg-slate-200 cursor-pointer">
                <td className="font-semibold p-2 text-center">{id}</td>
                <td className="font-semibold p-2 flex justify-center ">
                  <StatusPill priority={priority} className="w-14" />
                </td>
                <td className="font-semibold p-2 text-center">{title}</td>
                <td className="font-semibold p-2 text-center">
                  {formatDistance(new Date(dateCreated), new Date(), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

JobOverview.propTypes = {
  jobOverviewData: PropTypes.array.isRequired,
};
