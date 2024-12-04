// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import User typowany z Firebase
import { auth } from '../firebase/firebaseConfig';

// Definiowanie interfejsu dla wartości kontekstu
interface UserContextType {
  user: User | null; // user będzie albo użytkownikiem, albo null
}

// Typowanie kontekstu
export const UserContext = createContext<UserContextType | null>(null);

// Dodanie typu dla propsów komponentu UserProvider
interface UserProviderProps {
  children: ReactNode; // Dzieci komponentu mogą być dowolnym elementem React
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Aktualizacja stanu użytkownika
    });
    return () => unsubscribe(); // Czyszczenie subskrypcji
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
