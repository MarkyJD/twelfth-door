import { useContext, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import UserContext from '../../context/UserContext';
import Header from '../Card/Header';
import Footer from '../Card/Footer';
import Post from './Post';
import FloatingButton from '../FloatingButton';
import TextEditor from './Post/TextEditor';

export default function Feed() {
  const { user } = useUser();
  const { feed } = useContext(UserContext);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const handlePost = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    setIsEditorOpen((prev) => !prev);
  };

  return (
    <div className="w-full p-3">
      <Header title="Announcements" />
      <section className="py-1">
        <div
          className={`${
            isEditorOpen
              ? ' fixed top-[4.75rem] bottom-3 inset-x-3 block bg-slate-50 dark:bg-slate-900 rounded'
              : ' hidden md:block h-24 w-full border rounded mb-3 shadow-sm bg-slate-50 '
          } `}
        >
          <TextEditor />
        </div>
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
      <FloatingButton handleClick={handleClick} />
      <Footer />
    </div>
  );
}
