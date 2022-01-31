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

// export async function getUserByUserId(uid) {
//   return null;
// }

// function generateCommentsArray() {
//   return null;
// }
