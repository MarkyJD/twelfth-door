import { useContext } from 'react';
import useUser from '../../hooks/useUser';
import Header from '../Card/Header';
import Footer from '../Card/Footer';

export default function Feed() {
  const { user } = useUser();
  const handlePost = (event) => {
    event.preventDefault();
  };
  return (
    <div className="w-full p-3">
      <Header title="Announcements" />
      <main>
        <div>Hi</div>
      </main>
      <section>
        <form
          method="POST"
          onSubmit={handlePost}
          className="container flex items-center space-x-3 justify-center"
        >
          <h2 className="font-mono text-lg text-darkBlue-200 font-bold">
            {user.username}
          </h2>
          <input
            type="text"
            placeholder="Enter your message"
            aria-label="Enter your message"
            className="text-sm text-darkGray-700 dark:text-lightGray-700 bg-lightGray-700 dark:bg-darkGray-700 py-5 px-4 h-2 border-b border-lightGray-400 dark:border-darkGray-400 outline-none"
          />
        </form>
      </section>
      <Footer />
    </div>
  );
}
