import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'; 
import { auth } from '../firebase/firebaseConfig';
import { UserContextType } from '../types/UserContext.types';

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Błąd podczas logowania przez Google:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, logout, loginWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
};
