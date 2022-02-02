import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { getAllAnnouncements } from '../services/firebase-services';

export default function useFeed() {
  const [feed, setFeed] = useState(null);
  // const { user } = useContext(UserContext);

  useEffect(() => {
    async function getFeed() {
      const results = await getAllAnnouncements();
      console.log('this fired');
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setFeed(results);
    }
    if (feed === null) {
      getFeed();
    }
  }, []);
  return { feed };
}
