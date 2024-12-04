import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Konto zostało utworzone!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error('Błąd:', error);
      alert(isRegistering ? 'Błąd rejestracji' : 'Błąd logowania');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleAuth} className="p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">{isRegistering ? 'Rejestracja' : 'Logowanie'}</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" name="email" id="email" required 
                 className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Hasło</label>
          <input type="password" name="password" id="password" required 
                 className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
        </button>
        <p className="text-center mt-4">
          {isRegistering ? (
            <span onClick={() => setIsRegistering(false)} className="text-blue-500 cursor-pointer">
              Masz już konto? Zaloguj się
            </span>
          ) : (
            <span onClick={() => setIsRegistering(true)} className="text-blue-500 cursor-pointer">
              Nie masz konta? Zarejestruj się
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
