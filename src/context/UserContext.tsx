import React, { createContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

interface UserContextType {
  user: User | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Funkcja wylogowania
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Resetuje stan użytkownika po wylogowaniu
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  // Funkcja logowania przez Google
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
