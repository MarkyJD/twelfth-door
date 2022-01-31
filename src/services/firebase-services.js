/* eslint-disable import/no-cycle */
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  limit,
  arrayRemove,
  doc,
  arrayUnion,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function getUserByDisplayName(displayName) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', displayName));

  const querySnapshot = await getDocs(q);

  let user = {};
  querySnapshot.forEach((doc) => {
    user = {
      ...doc.data(),
      docId: doc.id,
    };
  });

  return user;
}

// function generateCommentsArray() {
//   return null;
// }
export async function getUserEmailByUsername(username) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username.toLowerCase()));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  let result = {};

  querySnapshot.forEach((doc) => {
    result = {
      ...doc.data(),
    };
  });

  return result;
}
