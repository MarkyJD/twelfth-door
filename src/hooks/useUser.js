import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { getUserByDisplayName } from '../services/firebase-services';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      const response = await getUserByDisplayName(user.displayName);
      setActiveUser(response);
    }
    if (user?.displayName) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
