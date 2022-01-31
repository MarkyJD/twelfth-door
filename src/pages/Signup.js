/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/Routes';

export default function Signup() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid =
    !fullname ||
    !emailAddress ||
    !username ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.title = 'Twelfth Door | Sign up';
  }, []);

  return (
    <div className="max-w-screen-md mx-auto h-screen flex items-center">
      <div className="w-3/4 md:py-0 md:container mx-auto flex border border-lightGray-500 dark:border-darkGray-400 rounded drop-shadow-md">
        <div className="hidden md:block w-1/2">
          <img
            className="rounded-l"
            src="/images/doorways.jpg"
            alt="doorways"
          />
        </div>
        <div className="w-full pt-10 md:p-0 md:w-1/2 flex flex-col justify-center bg-lightGray-700 dark:bg-darkGray-500 ">
          <div className="w-5/6 flex px-5 mx-auto flex-col items-center">
            <h1 className="text-3xl text-shadow-md font-title mb-3">
              Twelfth Door
            </h1>
            <p className="text-lg mb-3 font-light italic text-lightGray-100">
              There are
              <span className="text-purple-700 dark:text-purple-400">
                {` always `}
              </span>
              more
              <span className="text-purple-700 dark:text-purple-400">
                {' '}
                doorways
              </span>
            </p>
            {error && <p className="text-lightRed-100 mb-3">{error}</p>}

            <form
              onSubmit={handleSignup}
              method="POST"
              className="w-full container flex flex-col"
            >
              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                value={emailAddress}
                aria-label="Enter you email address"
                className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded mt-5 mb-3"
                onChange={({ target }) => setEmailAddress(target.value)}
              />

              {/* Fullnaem */}
              <input
                type="text"
                placeholder="Fullname"
                value={fullname}
                aria-label="Enter you fullname"
                className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded mb-3"
                onChange={({ target }) => setFullname(target.value)}
              />

              {/* Username */}
              <input
                type="text"
                placeholder="Username"
                value={username}
                aria-label="Choose a Username"
                className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded mb-3"
                onChange={({ target }) => setUsername(target.value)}
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                aria-label="Create a password"
                className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded mb-3"
                onChange={({ target }) => setPassword(target.value)}
              />

              {/* Confirm Password */}
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                aria-label="Retype your password to confirm"
                className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded mb-3"
                onChange={({ target }) => setConfirmPassword(target.value)}
              />

              <button
                disabled={isInvalid}
                type="submit"
                className={`mb-5 mt-3 bg-darkBlue-100 hover:bg-darkBlue-200 shadow-md text-white font-bold w-3/4 mx-auto rounded h-10 ${
                  isInvalid && ' opacity-50 hover:bg-darkBlue-100'
                }`}
              >
                Sign up
              </button>
            </form>
            <p className="pb-10 md:p-0">
              Already have an account?
              <span className="font-bold">
                <Link to={ROUTES.LOGIN}>{' Login'}</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
