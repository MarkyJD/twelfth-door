import { useState, useEffect, useContext } from 'react';
import { getAllAnnouncements } from '../services/firebase-services';
import UserContext from '../context/UserContext';

export default function useFeed() {
  const [feed, setFeed] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getFeed() {
      const results = await getAllAnnouncements();
      console.log('this fired');
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setFeed(results);
    }
    if (user?.uid) {
      getFeed();
    }
  }, [user]);
  return { feed };
}
