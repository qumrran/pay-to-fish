import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Błąd logowania przez Google: ' + err.message);
    }
  };

  return { handleGoogleAuth, error };
};

export default useGoogleAuth;
