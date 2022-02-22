/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/named */
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useUser from '../../hooks/useUser';
import Footer from '../Card/Footer';
import Header from '../Card/Header';
import Pagination from './Pagination';
import Table from './Table';
import { allColumns, getColumns } from '../../helpers/Columns';
import { getCurrentJobs, addJob } from '../../services/firebase-services';
import FloatingButton from '../FloatingButton';
import TextEditor from '../TextEditor';

export default function JobTable({ updateActiveJob, setJobOverviewData }) {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
  const [contentForMobile, setContentForMobile] = useState({});

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditorOpenOnMobile, setIsEditorOpenOnMobile] = useState(false);
  const [isValidPost, setIsValidPost] = useState(false);

  const setFAB = (isValid) => {
    setIsValidPost(isValid);
  };

  const updateJobTable = () => {
    setUpdate((prev) => prev + 1);
  };

  const toggleEditor = (mobile = false) => {
    setIsEditorOpen((prev) => !prev);
    if (mobile) {
      setIsEditorOpenOnMobile((prev) => !prev);
    }
  };

  const handlePost = async ({ entry }) => {
    toggleEditor();
    const newestJob = data.reduce((prev, current) =>
      parseInt(prev.jobNo, 10) > parseInt(current.jobNo, 10) ? prev : current
    );
    const prevJobNo = parseInt(newestJob.jobNo, 10);
    await addJob(user.username, entry, prevJobNo);
    updateJobTable();
  };

  useEffect(() => {
    async function getData() {
      const results = await getCurrentJobs();
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setData(results);
      setJobOverviewData(results);
      setLoading(false);
    }

    if (loading || update > 0) {
      getData();
    }
  }, [update]);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const columns = useMemo(() => getColumns(isDesktop), [isDesktop]);

  return !user || loading ? (
    <p>Loading...</p>
  ) : (
    <div className="w-full">
      <section className="py-1">
        {isEditorOpen ? (
          <div
            // onClick={toggleEditor}
            className={`${
              isEditorOpenOnMobile
                ? ' fixed inset-y-0 inset-x-0 block '
                : ' hidden md:block fixed inset-x-0 inset-y-0 '
            } bg-black/60 transition-all ease-in-out duration-300 p-2`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-50 mx-auto shadow-2xl px-3 py-2 w-11/12 h-5/6 md:w-5/6 md:h-5/6 lg:w-9/12 lg:h-5/6 xl:w-4/6 xl:h-5/6 2xl:w-1/2 2xl:h-5/6 top-[50%] -translate-y-[50%] rounded border border-lightGray-500 dark:border-darkGray-400 bg-lightGray-700 dark:bg-darkGray-700"
            >
              <TextEditor
                setContentForMobile={setContentForMobile}
                mode="job"
                toggleEditor={toggleEditor}
                setFAB={setFAB}
                isEditorOpenOnMobile={isEditorOpenOnMobile}
                handlePost={handlePost}
              />
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center mb-3 mt-3 space-x-2 font-sm text-gray-600 dark:text-gray-400">
            <button
              type="button"
              className="font-bold text-sm text-white py-2 px-3 bg-blue-600 dark:bg-blue-600  hover:bg-blue-700 dark:hover:bg-blue-500 border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded"
              onClick={toggleEditor}
            >
              Add Job
            </button>
          </div>
        )}
      </section>

      <Table
        data={data}
        columns={columns}
        getRowProps={(row) => ({
          onClick: () => {
            row.toggleRowSelected();
            updateActiveJob(row.isSelected ? null : row.original);
          },
          className: row.isSelected
            ? 'transition bg-slate-200 text-white dark:bg-slate-700 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600'
            : '',
        })}
      />
      <Pagination />
      <FloatingButton
        contentForMobile={contentForMobile}
        isEditorOpen={isEditorOpen}
        handlePost={handlePost}
        isValidPost={isValidPost}
        toggleEditor={toggleEditor}
      />
      <Footer label="Load More" onClick={() => {}} />
    </div>
  );
}

JobTable.propTypes = {
  updateActiveJob: PropTypes.func.isRequired,
  setJobOverviewData: PropTypes.func.isRequired,
};
