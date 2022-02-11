import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import UserContext from '../../context/UserContext';
import Header from '../Card/Header';
import Footer from '../Card/Footer';
import Post from './Post';

export default function Feed() {
  const { user } = useUser();
  const { feed } = useContext(UserContext);
  const handlePost = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full p-3">
      <Header title="Announcements" />
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
      <main>
        {feed ? (
          feed
            .slice(0, 10)
            .map((post) => <Post key={post.docId} message={post} />)
        ) : (
          <Skeleton count={20} height={40} width={100} />
        )}
      </main>
      <Footer />
    </div>
  );
}
