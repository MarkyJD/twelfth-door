/* eslint-disable react/prop-types */
import formatDistance from 'date-fns/formatDistance';
import StatusPill from '../components/JobTable/StatusPill';

export const allColumns = [
  {
    Header: '#',
    accessor: 'jobNo',
    className: 'text-xs font-semibold',
  },
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
  // All below columns will be Hidden by default
  {
    Header: 'Department',
    accessor: 'department',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }) => value.join(' '),
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
  // All below columns will be hidden
  {
    Header: 'Department',
    accessor: 'department',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    Cell: ({ value }) => value.join(' '),
  },
];

export function getColumns(isDesktop) {
  return isDesktop ? allColumns : compactColumns;
}
