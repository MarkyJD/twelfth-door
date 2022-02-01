/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import {
  BiBarChartAlt2,
  BiChevronLeft,
  BiChevronRight,
  BiDesktop,
  BiDollarCircle,
  BiHdd,
  BiHome,
  BiMessageDetail,
  BiWrench,
  BiX,
} from 'react-icons/bi';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
import NavItem from './NavItem';
import useUser from '../../hooks/useUser';

export default function Sidebar({
  open,
  toggleOpen,
  expanded,
  toggleExpanded,
}) {
  const { user } = useUser();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  return (
    <div className="sidebar relative flex flex-col h-full px-3 first:px-0 ">
      <header className={`flex justify-between items-center h-16 px-3 `}>
        <Link className="flex items-center" to={ROUTES.HOME}>
          <h1
            className={`text-white text-lg text-shadow-lg font-title p-1 hover:text-lightBlue-100 ${
              !expanded && ' ml-3.5'
            }`}
          >
            {expanded ? 'Twelfth Door' : 'td'}
          </h1>
        </Link>
        <div className="w-8">
          {open && (
            <BiX
              onClick={toggleOpen}
              className={`icon md:hidden ${
                !expanded && ' absolute left-6 bottom-6'
              }`}
            />
          )}
        </div>
      </header>
      <nav className="mx-auto w-10/12">
        <NavItem
          expanded={expanded}
          title="Home"
          icon={BiHome}
          path={ROUTES.HOME}
          active={ROUTES.HOME === currentPath}
          setCurrentPath={setCurrentPath}
        />
        <NavItem
          expanded={expanded}
          title="Jobs"
          icon={BiWrench}
          path={ROUTES.JOBS}
          active={ROUTES.JOBS === currentPath}
          setCurrentPath={setCurrentPath}
        />
        <NavItem
          expanded={expanded}
          title="Messages"
          icon={BiMessageDetail}
          path={ROUTES.MESSAGES}
          active={ROUTES.MESSAGES === currentPath}
          setCurrentPath={setCurrentPath}
        />
        <NavItem
          expanded={expanded}
          title="Drive"
          icon={BiHdd}
          path={ROUTES.DRIVE}
          active={ROUTES.DRIVE === currentPath}
          setCurrentPath={setCurrentPath}
        />
        <NavItem
          expanded={expanded}
          title="Targets"
          icon={BiDollarCircle}
          path={ROUTES.TARGETS}
          active={ROUTES.TARGETS === currentPath}
          setCurrentPath={setCurrentPath}
        />
        <NavItem
          expanded={expanded}
          title="Reports"
          icon={BiBarChartAlt2}
          path={ROUTES.REPORTS}
          active={ROUTES.REPORTS === currentPath}
          setCurrentPath={setCurrentPath}
        />
        {user.privilege === 'admin' ? (
          <NavItem
            expanded={expanded}
            title="Admin"
            icon={BiDesktop}
            path={ROUTES.ADMIN}
            active={ROUTES.ADMIN === currentPath}
            setCurrentPath={setCurrentPath}
          />
        ) : null}
      </nav>
      {!open && expanded ? (
        <div className="hover:bg-slate-600 rounded p-1 hidden md:block absolute bottom-6 left-6">
          <BiChevronLeft onClick={toggleExpanded} className="icon" />
        </div>
      ) : !open && !expanded ? (
        <div className="hover:bg-slate-600 rounded p-1 hidden md:block absolute bottom-6 left-6">
          <BiChevronRight onClick={toggleExpanded} className="icon" />
        </div>
      ) : null}
    </div>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
};
