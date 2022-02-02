import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  enableIndexedDbPersistence,
  disableNetwork,
} from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';

// eslint-disable-next-line import/no-cycle

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
enableIndexedDbPersistence(db).catch((error) => {
  if (error.code === 'failed-precondition') {
    console.log(error.message);
  } else if (error.code === 'unimplemented') {
    console.log(error.message);
  }
});

export {
  firebase,
  db,
  signOut,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
};
