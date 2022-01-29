/* eslint-disable */
import {
  BiAbacus,
  BiBarChartAlt2,
  BiChevronLeft,
  BiChevronRight,
  BiData,
  BiHome,
  BiMessageDetail,
  BiPaintRoll,
  BiX,
} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
import useDarkMode from '../../hooks/useDarkMode';
import Logo from './Logo';
import NavItem from './NavItem';

export default function Sidebar({
  open,
  toggleOpen,
  expanded,
  toggleExpanded,
}) {
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
        <div className={`w-8`}>
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
        />
        <NavItem
          expanded={expanded}
          title="Jobs"
          icon={BiPaintRoll}
          path={ROUTES.HOME}
        />
        <NavItem
          expanded={expanded}
          title="Messages"
          icon={BiMessageDetail}
          path={ROUTES.HOME}
        />
        <NavItem
          expanded={expanded}
          title="Drive"
          icon={BiData}
          path={ROUTES.HOME}
        />
        <NavItem
          expanded={expanded}
          title="Targets"
          icon={BiAbacus}
          path={ROUTES.HOME}
        />
        <NavItem
          expanded={expanded}
          title="Reports"
          icon={BiBarChartAlt2}
          path={ROUTES.HOME}
        />
      </nav>
      {!open && expanded ? (
        <BiChevronLeft
          onClick={toggleExpanded}
          className="hidden md:block icon absolute bottom-6 left-6"
        />
      ) : !open && !expanded ? (
        <BiChevronRight
          onClick={toggleExpanded}
          className="hidden md:block icon absolute bottom-6 left-6"
        />
      ) : null}
    </div>
  );
}
