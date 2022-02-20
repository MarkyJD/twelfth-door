/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import JobTable from '../components/JobTable';
import InfoBar from '../components/JobTable/InfoBar';
import JobOverview from '../components/JobTable/JobOverview';

export default function Jobs() {
  const [activeJob, setActiveJob] = useState(null);
  const [infoBarOpen, setInfoBarOpen] = useState(false);
  const [jobOverviewData, setJobOverviewData] = useState(null);

  useEffect(() => {
    document.title = 'Twelfth Door | Jobs';
  }, []);

  return (
    <div>
      <header className="">
        <p className="font-serif">Jobs Page</p>
      </header>
      <div className="border-b border-slate-200 dark:border-slate-600 w-full mt-1 mb-3" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-start w-full space-x-3">
          <div className="w-full md:w-7/12 shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600 overflow-auto p-3">
            <JobTable
              setActiveJob={setActiveJob}
              setJobOverviewData={setJobOverviewData}
            />
          </div>
          <div className="hidden md:flex md:flex-col md:w-5/12 relative z-0 space-y-2">
            <div className="shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600 md:mr-3 fixed md:w-[33%] 2xl:w-[33%]">
              {activeJob ? (
                <InfoBar activeJob={activeJob} />
              ) : jobOverviewData ? (
                <JobOverview jobOverviewData={jobOverviewData} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
