import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getCurrentJobs } from '../services/firebase-services';
import Feed from '../components/Feed';
import LatestProjections from '../components/LatestProjections';
import JobOverview from '../components/JobTable/JobOverview';

export default function Home() {
  const today = new Date();
  const [jobOverviewData, setJobOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const results = await getCurrentJobs();
      console.log('i ran again');
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setJobOverviewData(results);
      setLoading(false);
    }

    if (loading) {
      getData();
    }
  }, []);

  useEffect(() => {
    document.title = 'Twelfth Door | Home';
  }, []);

  return (
    <div>
      <div>
        <p className="font-thin text-lg dark:text-lightBlue-100 text-darkBlue-100">
          {format(today, 'cccc, ')}
          <span className="text-sm font-bold text-slate-500">
            {format(today, 'do MMMM')}
          </span>
        </p>
        <div className="border-b border-slate-200 dark:border-slate-600 w-full mt-1 mb-3" />
      </div>
      <div className=" max-w-screen-2xl mx-auto">
        <div className="flex items-start w-full space-x-3">
          <div className="w-full md:w-7/12 shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
            <Feed />
          </div>
          <div className="hidden md:flex md:flex-col md:w-5/12 space-y-2">
            <div className="shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
              {!loading && <JobOverview jobOverviewData={jobOverviewData} />}
            </div>
            <div className="shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
              <LatestProjections />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
