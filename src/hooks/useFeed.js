import { useState, useEffect } from 'react';
import { getAnnouncements } from '../services/firebase-services';

export default function useFeed() {
  const [feed, setFeed] = useState(null);
  const [update, setUpdate] = useState(0);
  const updateFeed = () => {
    setUpdate((prev) => prev + 1);
  };
  // const { user } = useContext(UserContext);

  useEffect(() => {
    async function getFeed() {
      const results = await getAnnouncements();
      // console.log(results);
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setFeed(results);
    }
    // if (feed === null) {
    getFeed();
    // }
    console.log('this fired');
  }, [update]);

  return { feed, updateFeed };
}
