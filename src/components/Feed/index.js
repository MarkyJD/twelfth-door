/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import UserContext from '../../context/UserContext';
import Header from '../Card/Header';
import Footer from '../Card/Footer';
import Post from './Post';
import FloatingButton from '../FloatingButton';
import TextEditor from '../TextEditor';
import { addMessage } from '../../services/firebase-services';

export default function Feed() {
  const { user } = useUser();
  const { feed, updateFeed } = useContext(UserContext);
  // Mobile responsive. By default hidden on mobile sizes
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditorOpenOnMobile, setIsEditorOpenOnMobile] = useState(false);
  const [isValidPost, setIsValidPost] = useState(false);

  const setFAB = (isValid) => {
    setIsValidPost(isValid);
  };

  const toggleEditor = (mobile = false) => {
    setIsEditorOpen((prev) => !prev);
    if (mobile) {
      setIsEditorOpenOnMobile((prev) => !prev);
    }
  };

  const handlePost = async ({ entry }) => {
    // event.preventDefault();
    toggleEditor();
    await addMessage(user.userId, user.username, entry);
    updateFeed();
  };

  return (
    <div className="w-full p-3 ">
      <Header title="Announcements" />
      <section className="py-1">
        {isEditorOpen ? (
          <div
            // onClick={toggleEditor}
            className={`${
              isEditorOpenOnMobile
                ? ' fixed inset-y-0 inset-x-0 block '
                : ' hidden md:block fixed inset-x-0 inset-y-0 '
            } bg-black/60 transition-all ease-in-out duration-300 p-2`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-50 mx-auto shadow-2xl px-3 py-2 w-11/12 h-5/6 md:w-5/6 md:h-5/6 lg:w-9/12 lg:h-5/6 xl:w-4/6 xl:h-5/6 2xl:w-1/2 2xl:h-5/6 top-[50%] -translate-y-[50%] rounded border border-lightGray-500 dark:border-darkGray-400 bg-lightGray-700 dark:bg-darkGray-700"
            >
              <TextEditor
                toggleEditor={toggleEditor}
                setFAB={setFAB}
                isEditorOpenOnMobile={isEditorOpenOnMobile}
                handlePost={handlePost}
              />
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center mb-2 space-x-2 font-sm text-gray-600 dark:text-gray-400">
            <button
              type="button"
              className="font-bold text-sm text-white py-2 px-3 bg-blue-600 dark:bg-blue-600  hover:bg-blue-700 dark:hover:bg-blue-500 border-lightGray-400 dark:border-darkGray-400 outline-lightBlue-200 rounded"
              onClick={toggleEditor}
            >
              Create Post
            </button>
          </div>
        )}
      </section>
      <main>
        {feed ? (
          feed.map((post) => (
            <Post key={post.docId} message={post} isEditorOpen={isEditorOpen} />
          ))
        ) : (
          <Skeleton count={20} height={40} width={100} />
        )}
      </main>
      <FloatingButton
        toggleEditor={toggleEditor}
        isEditorOpen={isEditorOpen}
        isValidPost={isValidPost}
        handlePost={handlePost}
      />
      <Footer />
    </div>
  );
}
