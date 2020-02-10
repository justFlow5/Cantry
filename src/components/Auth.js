import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase/Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([], () => {
    const localData = localStorage.getItem('userData');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
    localStorage.setItem('userData', JSON.stringify(currentUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;
