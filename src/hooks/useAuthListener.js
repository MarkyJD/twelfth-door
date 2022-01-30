import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/FirebaseContext';

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('auth-user'))
  );
  const { onAuthStateChanged, getAuth } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem('auth-user', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('auth-user');
        setUser(null);
      }
    });
  }, []);

  return { user };
}
