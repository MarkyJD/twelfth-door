import { useEffect } from 'react';
import JobTable from '../components/JobTable';

export default function Jobs() {
  useEffect(() => {
    document.title = 'Twelfth Door | Jobs';
  }, []);

  return (
    <div>
      <header>
        <p className="font-serif">Jobs Page</p>
      </header>
      <div className="border-b border-slate-200 dark:border-slate-600 w-full mt-1 mb-3" />
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-start w-full space-x-3">
          <div className="w-full md:w-7/12 shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
            <JobTable />
          </div>
          <div className="hidden md:flex md:flex-col md:w-5/12 space-y-2">
            <div className="shadow-lg rounded bg-lightGray-700 dark:bg-darkGray-600">
              InfoBar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
