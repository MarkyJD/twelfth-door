import { useState, useEffect } from 'react';
import { getAnnouncements } from '../services/firebase-services';

export default function useFeed() {
  const [feed, setFeed] = useState(null);
  // const { user } = useContext(UserContext);

  useEffect(() => {
    async function getFeed() {
      const results = await getAnnouncements();
      // console.log(results);
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setFeed(results);
    }
    if (feed === null) {
      getFeed();
    }
  }, []);
  return { feed };
}
