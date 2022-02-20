/* eslint-disable react/prop-types */
import formatDistance from 'date-fns/formatDistance';
import StatusPill from '../components/JobTable/StatusPill';

const allColumns = [
  {
    Header: 'Priority',
    accessor: 'priority',
    Cell: ({ value }) => <StatusPill priority={value} />,
    sortType: (a, b) => {
      const priorities = ['high', 'medium', 'low'];
      const x = priorities.indexOf(a.values.priority);

      const y = priorities.indexOf(b.values.priority);
      return x - y;
    },
  },
  {
    Header: 'Title',
    accessor: 'title',
    className: 'font-semibold',
  },
  {
    Header: 'Requested By',
    accessor: 'requestedBy',
  },
  {
    Header: 'Responsible',
    accessor: 'responsible',
  },
  {
    Header: 'Posted',
    accessor: 'dateCreated',
    Cell: ({ value }) =>
      formatDistance(new Date(value), new Date(), { addSuffix: true }),
    className: 'text-xs',
  },
];

const compactColumns = [
  {
    Header: 'Priority',
    accessor: 'priority',
    Cell: ({ value }) => <StatusPill priority={value} />,
    sortType: (a, b) => {
      const priorities = ['high', 'medium', 'low'];
      const x = priorities.indexOf(a.values.priority);

      const y = priorities.indexOf(b.values.priority);
      return x - y;
    },
  },
  {
    Header: 'Title',
    accessor: 'title',
    className: 'font-semibold',
  },
  {
    Header: 'Responsible',
    accessor: 'responsible',
  },
  {
    Header: 'Posted',
    accessor: 'dateCreated',
    Cell: ({ value }) =>
      formatDistance(new Date(value), new Date(), { addSuffix: true }),
    className: 'text-xs',
  },
];

export function getColumns(isDesktop) {
  return isDesktop ? allColumns : compactColumns;
}
