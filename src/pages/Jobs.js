/* eslint-disable  */
import { useEffect, useState } from 'react';
import JobTable from '../components/JobTable';
import InfoBar from '../components/JobTable/InfoBar';
import JobOverview from '../components/JobTable/JobOverview';
import FloatingButton from '../components/FloatingButton';
import { getCurrentJobs } from '../services/firebase-services';

export default function Jobs() {
  const [activeJob, setActiveJob] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [jobOverviewData, setJobOverviewData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('jobs');
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Twelfth Door | Jobs';
  }, []);

  useEffect(() => {
    async function getData() {
      const results = await getCurrentJobs();
      console.log('i ran again');
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setData(results);
      setJobOverviewData(results);
      setLoading(false);
    }

    if (loading || update > 0) {
      getData();
    }
  }, [update]);

  const updateActiveJob = (newState) => {
    setActiveJob(newState);

    setSelectedTab('info');
  };

  const updateMedia = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const renderElement = () => {
    if (selectedTab === 'jobs') {
      if (activeJob) {
        setActiveJob(null);
      }
      return (
        <JobTable
          loading={loading}
          setUpdate={setUpdate}
          data={data}
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
  };

  return (
    <div>
      <header className="">
        <p className="font-serif">Jobs Page</p>
      </header>
      <div className="border-b border-slate-200 dark:border-slate-600 w-full mt-1 mb-3" />
      <div className="max-w-screen-2xl mx-auto relative">
        <div className="flex items-start w-full md:space-x-3">
          <div className="w-full  shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600 overflow-auto p-3 relative z-30">
            <div className="relative inset-x-0 inset-y-0 -m-3 mb-3 rounded-t h-12 bg-gray-300 flex">
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
          {/* <div className={`md:flex md:flex-col md:w-5/12 relative space-y-2`}>
            <div className="hidden md:block shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600 md:mr-3 fixed md:w-[33%] 2xl:w-[33%] ">
              {activeJob ? (
                <InfoBar activeJob={activeJob} />
              ) : jobOverviewData ? (
                <JobOverview jobOverviewData={jobOverviewData} />
              ) : null}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
