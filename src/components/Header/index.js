/* eslint-disable */
import { BiUser, BiMoon, BiSun, BiMenu } from 'react-icons/bi';
import Datetime from './Datetime';
import useDarkMode from '../../hooks/useDarkMode';

export default function Header({ toggleOpen }) {
  // TODO Add firebase auth
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="header w-full h-full px-5 flex justify-between items-center">
      <div className="block w-10 p-1 hover:bg-slate-600  md:hover:bg-transparent rounded">
        <BiMenu className="icon md:hidden" onClick={toggleOpen} />
      </div>
      <div className="flex">
        {isDarkMode ? (
          <div className="w-10 p-1 hover:bg-slate-600 rounded">
            <BiSun
              className="icon hover:text-amber-300 "
              onClick={toggleDarkMode}
            />
          </div>
        ) : (
          <div className="w-10 p-1 hover:bg-slate-600 rounded">
            <BiMoon
              className="icon hover:text-blue-500"
              onClick={toggleDarkMode}
            />
          </div>
        )}

        <div className="w-10 p-1 hover:bg-slate-600 rounded">
          <BiUser className="icon" />
        </div>
      </div>
    </div>
  );
}
