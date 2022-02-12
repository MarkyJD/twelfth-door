import { useEffect } from 'react';
import { format } from 'date-fns';
import Feed from '../components/Feed';
import LatestJobs from '../components/LatestJobs';
import LatestProjections from '../components/LatestProjections';

export default function Home() {
  const today = new Date();

  useEffect(() => {
    document.title = 'Twelfth Door | Home';
  }, []);

  return (
    <div className=" max-w-screen-2xl mx-auto">
      <div>
        <h2 className="font-thin text-lg dark:text-lightBlue-100 text-darkBlue-100">
          {format(today, 'cccc, ')}
          <span className="text-sm font-bold text-slate-500">
            {format(today, 'do MMMM')}
          </span>
        </h2>
      </div>
      <div className="border-b border-slate-200 dark:border-slate-600 w-full mt-1 mb-3" />
      <div className="grid grid-cols-12 grid-rows-2 gap-3">
        <div className="col-span-12 row-span-2 md:col-span-6 lg:col-span-7 w-full shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
          <Feed />
        </div>
        <div className="hidden md:block col-span-12 md:col-span-6 lg:col-span-5 w-full shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
          <LatestJobs />
        </div>
        <div className="hidden md:block col-span-12 md:col-span-6 lg:col-span-5 w-full shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
          <LatestProjections />
        </div>
      </div>
    </div>
  );
}
