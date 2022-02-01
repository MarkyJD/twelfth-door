/* eslint-disable */
import { useContext, useState } from 'react';
import {
  BiUser,
  BiMoon,
  BiSun,
  BiMenu,
  BiBell,
  BiChevronDown,
  BiUserCircle,
  BiCog,
  BiExit,
} from 'react-icons/bi';
import useDarkMode from '../../hooks/useDarkMode';
import FirebaseContext from '../../context/FirebaseContext';
import UserContext from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';


export default function Header({ toggleOpen }) {
  const { getAuth, signOut } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const auth = getAuth();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();


  const toggleDropdown = () => {
    if (!dropdownOpen) {
      document.getElementById('listWrapper').focus();
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleSignout = () => {
    signOut(auth);
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="header w-full h-full px-5 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className='block w-10 p-1 hover:bg-slate-600  md:hover:bg-transparent rounded'> 
          <BiMenu className="icon md:hidden" onClick={toggleOpen} />
        </div>

          <input
              type="text"
              placeholder="Search"
              aria-label="Enter your username or Email Address"
              className="text-sm text-lightGray-700 w-3/4 bg-slate-700 py-5 px-4 h-2 border border-darkGray-400 outline-slate-600 rounded "
            />

      </div>
      <div className="flex">
        {isDarkMode ? (
          <div className="w-10 p-1 mx-1 hover:bg-slate-600 rounded">
            <BiSun
              className="icon hover:text-amber-300 "
              onClick={toggleDarkMode}
            />
          </div>
        ) : (
          <div className="w-10 p-1 mx-1 hover:bg-slate-600 rounded">
            <BiMoon
              className="icon hover:text-blue-500"
              onClick={toggleDarkMode}
            />
          </div>
        )}

        <div className="w-10 p-1 mx-1 mr-2 hover:bg-slate-600 rounded">
          <BiBell className="icon" />
        </div>
        <div className="border h-8 my-auto border-slate-600" />

        {user && (
          <div className="text-center mx-1 ml-3 flex items-center">
            <Link to={'/'}>
              <h2 className="text-slate-200 p-1 font-bold text-md text-shadow hover:text-lightBlue-100 cursor-pointer font-mono">
                {user.displayName}
              </h2>
            </Link>
          </div>
        )}

        <div
          className={`w-10 p-1 mx-1 hover:bg-slate-600 rounded ${
            dropdownOpen && 'bg-slate-600'
          }`}
        >
          {!dropdownOpen ? (
            <BiUser className="icon" onClick={toggleDropdown} />
          ) : (
            <BiChevronDown className="icon" onClick={toggleDropdown}   />
          )}
        </div>
      </div>
      <div

        className={`bg-slate-700 text-sm w-36 rounded-lg shadow-lg absolute flex flex-col items-center top-14 right-3 transform transition duration-200 ease-in-out -translate-y-64 ${
          dropdownOpen && ' translate-y-0'
        }`}
      >
        <div className="flex flex-col items-center w-full" id="listWrapper" tabIndex={0} onBlur={toggleDropdown}>
          <div className="w-10/12 h-10 mt-2 my-1 px-2 flex items-center rounded hover:bg-slate-600 text-white font-semibold">
            <div onClick={() => navigate(ROUTES.PROFILE)} className="p-1 flex items-center space-x-1 cursor-pointer">
              <BiUserCircle className="icon h-6" />
              <h2>Profile</h2>
            </div>
          </div>
          <div className="border-b border-slate-600 w-11/12" />
          <div className="w-10/12 h-10 my-1 px-2 flex items-center rounded hover:bg-slate-600 text-white font-semibold">
            <div onClick={() => navigate(ROUTES.SETTINGS)} className="p-1 flex items-center space-x-1 cursor-pointer">
              <BiCog className="icon h-6" />
              <h2>Settings</h2>
            </div>
          </div>
          <div className="border-b border-slate-600 w-11/12" />
          <div className="w-10/12 h-10 my-1 mb-2 px-2 flex items-center rounded hover:bg-slate-600 text-white font-semibold">
            <div
              className="p-1 flex cursor-pointer items-center space-x-1"
              onClick={handleSignout}
              >
              <BiExit className="icon h-6" />
              <h2>Log Out</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
