/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  limit,
  arrayRemove,
  orderBy,
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function getAllUsers() {
  const usersRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersRef);

  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      docId: doc.id,
    });
  });

  return results;
}

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

export async function getAnnouncements(number = 15) {
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef,
    where('recipients', 'array-contains', '@everyone'),
    orderBy('dateCreated', 'desc'),
    limit(number)
  );
  const querySnapshot = await getDocs(q);
  let source = 'Nothing fetched';
  onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        // console.log('new change: ', change.doc.data());
      }

      source = snapshot.metadata.fromCache ? 'local cache' : 'server';
      console.log('Data came from: ', source);
    });
  });

  if (querySnapshot.empty) {
    return null;
  }

  const results = [];

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      docId: doc.id,
    });
  });

  return results;
}

export async function addCommentByDocId(docId, username, comment) {
  const docRef = doc(db, 'messages', docId);

  const newComment = {
    comment,
    username,
    dateCreated: Date.now(),
  };

  await updateDoc(docRef, {
    comments: arrayUnion(newComment),
  });
}

export async function addMessage(userId, username, rawMessage) {
  const message = {
    author: username,
    comments: [],
    richText: true,
    content: rawMessage.body,
    dateCreated: Date.now(),
    recipients: rawMessage.recipients.map((recipient) => recipient.value),
    subject: rawMessage.title,
    subtitle: rawMessage.subtitle ? rawMessage.subtitle : '',
    userId,
  };

  const messagesRef = collection(db, 'messages');
  const docRef = await addDoc(messagesRef, message);

  return docRef;
}

export async function addJob(username, rawJob, prevJobNo) {
  const job = {
    title: rawJob.title,
    comments: [],
    dateCreated: Date.now(),
    department: rawJob.department.map((dept) => dept.value),
    description: rawJob.description || '',
    jobId: uuidv4(),
    jobNo: prevJobNo + 1,
    priority: rawJob.priority,
    tags: rawJob?.tags ? rawJob.tags.map((tag) => tag.value) : [],
    status: 'new',
    responsible: rawJob.responsible,
    requestedBy: username,
  };

  const jobsRef = collection(db, 'jobs');
  const docRef = await addDoc(jobsRef, job);

  return docRef;
}

export async function getCurrentJobs() {
  const jobsRef = collection(db, 'jobs');
  const q = query(jobsRef, where('status', '!=', 'complete'));

  const querySnapshot = await getDocs(q);

  const results = [];

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      docId: doc.id,
    });
  });

  return results;
}
