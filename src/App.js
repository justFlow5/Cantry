// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';

// import { firebase, googleAuthProvider } from './firebase/Firebase';
// // import { navigate } from '@reach/router';
// import AppRouter from './AppRouter';
// import { Link, navigate } from '@reach/router';

// import UserContext from './components/User-context';
// import netlifyIdentity from 'netlify-identity-widget';
// // netlifyIdentity.init();

// const App = () => {
//   const [uid, setUid] = useState('');

//   // var uid;
//   const handleLogin = () => {
//     netlifyIdentity.open();
//     netlifyIdentity.on('login', user => {
//       setUid(user.id);
//       // uid = user.id;
//       console.log('UID', uid);
//       if (uid) navigate('/dashboard');
//     });
//   };

//   const handleLogout = () => {
//     netlifyIdentity.logout();
//     netlifyIdentity.on('logout', () => {
//       setUid('');
//       navigate('/');
//     });
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         uid,
//         // setUid,
//         handleLogin,
//         handleLogout
//       }}
//     >
//       <AppRouter />
//     </UserContext.Provider>
//   );
// };

// export default App;
