/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-key */
import { useMemo, useState } from 'react';
import { matchSorter } from 'match-sorter';

import PropTypes from 'prop-types';
import {
  useSortBy,
  useTable,
  useFilters,
  useGlobalFilter,
  useRowSelect,
} from 'react-table';
import { FixedSizeList } from 'react-window';
import GlobalFilter from './GlobalFilter';

function SortIcon({ className }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z" />
    </svg>
  );
}

function SortUpIcon({ className }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z" />
    </svg>
  );
}

function SortDownIcon({ className }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" />
    </svg>
  );
}

const defaultPropGetter = () => ({});

export default function Table({
  columns,
  data,
  windowWidth,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  let hiddenColumns = ['department', 'status', 'description', 'tags'];
  if (windowWidth === 'sm') {
    hiddenColumns = [
      'requestedBy',
      'department',
      'status',
      'description',
      'tags',
    ];
  }

  if (windowWidth === 'md') {
    hiddenColumns = ['status', 'description', 'tags'];
  }

  if (windowWidth === 'lg') {
    hiddenColumns = ['status', 'description'];
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,

      initialState: {
        hiddenColumns: hiddenColumns,
      },
      stateReducer: (newState, action, prevState) => {
        if (action.type === 'toggleRowSelected') {
          if (prevState.selectedRowIds[action.id] === true) {
            newState.selectedRowIds = {
              [action.id]: false,
            };
          } else {
            newState.selectedRowIds = {
              [action.id]: true,
            };
          }
        }

        console.log(action);

        return newState;
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect
  );

  const { globalFilter, selectedRowIds } = state;
  const total = preGlobalFilteredRows.length;
  const current = rows.length;

  return (
    <div>
      <div className=" mb-3 flex space-x-3 items-center">
        <label className="">
          Search:{' '}
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </label>
        <p className="font-semibold text-slate-500 font-mono">
          <span className="font-normal">{current}</span>
          {` / ${total}`}
        </p>
      </div>
      <table className="border w-full " {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="bg-slate-600 select-none dark:bg-slate-800 h-14 uppercase text-slate-100 dark:text-slate-300 text-[0.68rem]"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                  <div className="mx-2 font-bold flex space-x-1 items-center">
                    <div>{column.render('Header')}</div>
                    <div>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <SortDownIcon />
                        ) : (
                          <SortUpIcon />
                        )
                      ) : (
                        <SortIcon />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="border-b border-slate-200 dark:border-slate-600 hover:bg-slate-100 cursor-pointer transition duration-75 dark:hover:bg-darkGray-400"
                {...row.getRowProps(getRowProps(row))}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                    >
                      <div className="mx-2 flex items-center min-h-[3rem] my-2 text-slate-600 dark:text-slate-300">
                        {cell.render('Cell')}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  windowWidth: PropTypes.string.isRequired,
};
