/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from './context/FirebaseContext';
import {
  firebase,
  db,
  signOut,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from './lib/firebase';

ReactDOM.render(
  <FirebaseContext.Provider
    value={{
      firebase,
      db,
      signOut,
      getAuth,
      signInWithEmailAndPassword,
      updateProfile,
      onAuthStateChanged,
    }}
  >
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
