/* eslint-disable react/prop-types */
import formatDistance from 'date-fns/formatDistance';
import StatusPill from '../components/JobTable/StatusPill';
import Tag from '../components/JobTable/Tag';

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
    className: 'text-sm font-bold',
  },
  {
    Header: 'Responsible',
    accessor: 'responsible',
    className: 'text-sm font-bold',
  },
  // All below columns will be Hidden by default
  {
    Header: 'Department',
    accessor: 'department',
    className: 'uppercase text-xs font-semibold',
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
    Cell: ({ value }) => (
      <div className="flex flex-wrap">
        {value.map((tag, i) => (
          <Tag key={i} tag={tag} />
        ))}
      </div>
    ),
  },
  {
    Header: 'Posted',
    accessor: 'dateCreated',
    Cell: ({ value }) =>
      formatDistance(new Date(value), new Date(), { addSuffix: true }),
    className: 'text-xs',
  },
];

export const mediumColums = [
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
    className: 'font-semibold text-sm',
  },
  {
    Header: 'Requested By',
    accessor: 'requestedBy',
    className: 'text-sm font-bold',
  },
  {
    Header: 'Responsible',
    accessor: 'responsible',
    className: 'text-sm font-bold',
  },
  // All below columns will be Hidden by default
  {
    Header: 'Department',
    accessor: 'department',
    className: 'text-xs font-semibold uppercase',
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
    className: 'font-semibold text-sm',
  },
  {
    Header: 'Responsible',
    accessor: 'responsible',
    className: 'text-sm font-bold',
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

export function getColumns(windowWidth) {
  switch (windowWidth) {
    case 'sm':
      return compactColumns;
    case 'md':
      return mediumColums;
    case 'lg':
      return allColumns;
    default:
      return allColumns;
  }
}
