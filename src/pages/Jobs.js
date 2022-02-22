/* eslint-disable  */
import { useEffect, useState } from 'react';
import JobTable from '../components/JobTable';
import InfoBar from '../components/JobTable/InfoBar';
import JobOverview from '../components/JobTable/JobOverview';
import FloatingButton from '../components/FloatingButton';

export default function Jobs() {
  const [activeJob, setActiveJob] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [jobOverviewData, setJobOverviewData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('jobs');

  useEffect(() => {
    document.title = 'Twelfth Door | Jobs';
  }, []);

  const updateActiveJob = (newState) => {
    setActiveJob(newState);
    if (isMobile) {
      setSelectedTab('info');
    }
  };

  const updateMedia = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const renderElement = () => {
    if (isMobile) {
      if (selectedTab === 'jobs') {
        if (activeJob) {
          setActiveJob(null);
        }
        return (
          <JobTable
            updateActiveJob={updateActiveJob}
            setJobOverviewData={setJobOverviewData}
          />
        );
      } else {
        if (activeJob) {
          return <InfoBar activeJob={activeJob} />;
        } else {
          return <JobOverview jobOverviewData={jobOverviewData} />;
        }
      }
    } else {
      return (
        <JobTable
          updateActiveJob={updateActiveJob}
          setJobOverviewData={setJobOverviewData}
        />
      );
    }
  };

  return (
    <div>
      <header className="">
        <p className="font-serif">Jobs Page</p>
      </header>
      <div className="border-b border-slate-200 dark:border-slate-600 w-full mt-1 mb-3" />
      <div className="max-w-screen-2xl mx-auto relative">
        <div className="flex items-start w-full md:space-x-3">
          <div className="w-full md:w-7/12 shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600 overflow-auto p-3 relative z-30">
            <div className="relative inset-x-0 inset-y-0 -m-3 mb-3 md:hidden rounded-t h-12 bg-gray-300 flex">
              <div
                role="button"
                onClick={() => setSelectedTab('jobs')}
                className={`${
                  selectedTab === 'jobs'
                    ? ' border-darkBlue-100 text-slate-700 dark:text-slate-200 '
                    : 'hover:text-slate-600 border-transparent text-slate-500 dark:text-slate-400'
                } transition-all duration-300 linear w-24 rounded-t justify-center border-b-2  flex items-center  font-bold select-none`}
              >
                Jobs
              </div>
              <div
                role="button"
                onClick={() => setSelectedTab('info')}
                className={`${
                  selectedTab === 'info'
                    ? ' border-darkBlue-100 text-slate-700 dark:text-slate-200 '
                    : 'hover:text-slate-600 border-transparent text-slate-500 dark:text-slate-400'
                } transition-all duration-300 linear w-24 rounded-t justify-center border-b-2  flex items-center  font-bold select-none`}
              >
                Info
              </div>
            </div>
            {renderElement()}
          </div>
          <div className={`md:flex md:flex-col md:w-5/12 relative space-y-2`}>
            <div className="hidden md:block shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600 md:mr-3 fixed md:w-[33%] 2xl:w-[33%] ">
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
