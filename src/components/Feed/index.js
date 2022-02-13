/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { BiX } from 'react-icons/bi';
import useUser from '../../hooks/useUser';
import UserContext from '../../context/UserContext';
import Header from '../Card/Header';
import Footer from '../Card/Footer';
import Post from './Post';
import FloatingButton from '../FloatingButton';
import TextEditor from '../TextEditor';

export default function Feed() {
  const { user } = useUser();
  const { feed } = useContext(UserContext);
  // Mobile responsive. By default hidden on mobile sizes
  const [isEditorOpenOnMobile, setIsEditorOpenOnMobile] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handlePost = (event) => {
    event.preventDefault();
  };

  const toggleEditor = (isEditorOpenOnMobile) => {
    if (isEditorOpenOnMobile) {
      setIsEditorOpenOnMobile((prev) => !prev);
    }
    setIsEditorOpen((prev) => !prev);
  };

  // Mobile sizes. FAB callback
  const handleClick = () => {
    setIsEditorOpenOnMobile((prev) => !prev);
  };

  return (
    <div className="w-full p-3 ">
      <Header title="Announcements" />
      <section className="py-1">
        {isEditorOpen || isEditorOpenOnMobile ? (
          <div
            onClick={() => toggleEditor(isEditorOpenOnMobile)}
            className={`${
              isEditorOpenOnMobile
                ? ' fixed inset-y-0 inset-x-0 block '
                : ' hidden md:block fixed inset-x-0 inset-y-0 '
            } bg-black/50 border-slate-200 dark:border-slate-700 p-2`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative mx-auto shadow-2xl ${
                isEditorOpenOnMobile ? ' w-5/6 h-5/6' : ' w-4/6 h-5/6'
              }  top-[50%] -translate-y-[50%] border rounded bg-slate-100 dark:bg-darkGray-600`}
            >
              <div className="w-full flex justify-between mb-2">
                <h2 className="text-lg font-bold">Whats on your mind?</h2>
                <BiX
                  className="icon text-black dark:text-white "
                  onClick={() => toggleEditor(isEditorOpenOnMobile)}
                />
              </div>
              <hr />
              <TextEditor />
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center mb-2 space-x-2 font-sm text-gray-600 dark:text-gray-400">
            <p>Have an announcement?</p>
            <button
              type="button"
              className="font-bold text-sm text-white py-2 px-3 bg-blue-600 dark:bg-blue-600  hover:bg-blue-700 dark:hover:bg-blue-500 border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded"
              onClick={() => toggleEditor(isEditorOpenOnMobile)}
            >
              Create Post
            </button>
          </div>
        )}
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
