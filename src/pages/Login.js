import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/FirebaseContext';
import * as ROUTES from '../constants/Routes';
import { getUserEmailByUsername } from '../services/firebase-services';

export default function Login() {
  const [comboInput, setComboInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = comboInput === '' || password === '';
  const navigate = useNavigate();
  const { getAuth, signInWithEmailAndPassword } = useContext(FirebaseContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const isEmail = comboInput.includes('@');
    let email = comboInput;
    try {
      if (!isEmail) {
        // Lookup user's email via their username
        const result = await getUserEmailByUsername(comboInput);
        if (result === null) {
          throw new Error('Invalid username');
        }
        email = result.emailAddress;
      }

      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTES.HOME);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Twelfth Door | Login';
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
            <p className="text-3xl text-shadow-md font-title mb-3">
              Twelfth Door
            </p>
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
              onSubmit={handleLogin}
              method="POST"
              className="w-full container flex flex-col"
            >
              <input
                type="text"
                placeholder="Username or Email Address"
                value={comboInput}
                aria-label="Enter your username or Email Address"
                className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded mt-5 mb-3"
                onChange={({ target }) => setComboInput(target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                aria-label="Enter your username"
                className="text-sm w-full text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 ounded mb-3"
                onChange={({ target }) => setPassword(target.value)}
              />

              <button
                disabled={isInvalid}
                type="submit"
                className={`mb-5 mt-3 bg-darkBlue-100 hover:bg-darkBlue-200 shadow-md text-white font-bold w-3/4 mx-auto rounded h-10 ${
                  isInvalid && ' opacity-50 hover:bg-darkBlue-100'
                }`}
              >
                Login
              </button>
            </form>
            <p className="pb-10 md:p-0">
              Forgot your password?
              <span className="font-bold">
                <Link to={ROUTES.FORGOT_PASSWORD}>{' Click here'}</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
