import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export const login = uid => {
//   firebase
//     .auth()
//     .signInWithPopup(googleAuthProvider)
//     .then(() => {
//       setUid(uid);
//     });
// };

// export const logout = () => {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       navigate('/');
//     });
// };

export const login = () => {
  return firebase.auth().signInWithPopup(googleAuthProvider);
};

export const logout = () => {
  firebase.auth().signOut();
  // .then(() => {
  //   navigate('/');
  // });
};
export { firebase, googleAuthProvider, db as default };

// let firebaseInstance;

// const getFirebase = firebase => {
//   if (firebaseInstance) {
//     return firebaseInstance;
//   }

//   firebase.initializeApp(firebaseConfig);
//   firebaseInstance = firebase;

//   return firebase;
// };

// export { getFirebase };
