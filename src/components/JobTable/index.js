/* eslint-disable import/named */
import PropTypes from 'prop-types';
import { useContext, useEffect, useMemo, useState } from 'react';
import UserContext from '../../context/UserContext';
import Footer from '../Card/Footer';
import Header from '../Card/Header';
import Pagination from './Pagination';
import Table from './Table';
import { getColumns } from '../../helpers/Columns';
import { getCurrentJobs } from '../../services/firebase-services';

export default function JobTable({ setActiveJob, setJobOverviewData }) {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  useEffect(() => {
    async function getData() {
      const results = await getCurrentJobs();
      setData(results);
      setJobOverviewData(results);
      setLoading(false);
    }

    if (loading) {
      getData();
    }
  }, []);

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
      <Header title="Jobs" />
      <Table
        data={data}
        columns={columns}
        getRowProps={(row) => ({
          onClick: () => {
            row.toggleRowSelected();
            setActiveJob(row.isSelected ? null : row.original);
          },
          className: row.isSelected
            ? 'transition bg-slate-200 text-white dark:bg-slate-700 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600'
            : '',
        })}
      />
      <Pagination />
      <Footer label="Load More" onClick={() => {}} />
    </div>
  );
}

JobTable.propTypes = {
  setActiveJob: PropTypes.func.isRequired,
  setJobOverviewData: PropTypes.func.isRequired,
};
