import propTypes from 'prop-types';
import { useEffect } from 'react';
import Feed from '../components/Feed';
import LatestJobs from '../components/LatestJobs';
import LatestProjections from '../components/LatestProjections';
import Datetime from '../components/Header/Datetime';

export default function Home() {
  useEffect(() => {
    document.title = 'Twelfth Door | Home';
  }, []);

  return (
    <div className=" max-w-screen-xl mx-auto">
      <div>
        <h2 className="font-thin text-lg dark:text-lightBlue-100 text-darkBlue-100">
          {'Today, '}
          <span className="text-sm font-bold text-slate-500">
            <Datetime />
          </span>
        </h2>
      </div>
      <div className="border-b border-slate-200 dark:border-slate-600 w-full mt-1 mb-3" />
      <div className="grid grid-cols-12 grid-rows-2 gap-3">
        <div className="col-span-12 row-span-2 md:col-span-6 lg:col-span-7 w-full shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
          <Feed />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-5 w-full shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
          <LatestJobs />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-5 w-full shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
          <LatestProjections />
        </div>
      </div>
    </div>
  );
}
