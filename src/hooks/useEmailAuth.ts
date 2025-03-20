import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const useEmailAuth = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleEmailAuth = async () => {
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);

        if (fullName.trim()) {
          await updateProfile(userCredential.user, { displayName: fullName });
        }

        await signOut(auth);
        setShowPopup(true);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        if (!userCredential.user.emailVerified) {
          setError('Proszę zweryfikować swój e-mail, zanim się zalogujesz.');
          await signOut(auth);
          return;
        }

        navigate('/dashboard');
      }
    } catch (err: any) {
      handleAuthError(err);
    }
  };

  const handleAuthError = (err: any) => {
    console.error('Błąd Firebase:', err);
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Konto z tym e-mailem już istnieje! Zaloguj się.',
      'auth/weak-password': 'Hasło musi mieć co najmniej 6 znaków.',
      'auth/invalid-email': 'Nieprawidłowy format e-maila.',
      'auth/wrong-password': 'Nieprawidłowe hasło. Spróbuj ponownie.',
      'auth/user-not-found': 'Nie znaleziono konta z tym e-mailem.',
      'auth/invalid-credential': 'Nieprawidłowe dane logowania lub brak konta. Sprawdź e-mail i hasło.',
    };
    setError(errorMessages[err.code] || `Wystąpił błąd: ${err.message}`);
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsRegistering(false);
    navigate('/login');
  };

  return {
    isRegistering,
    setIsRegistering,
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    error,
    showPopup,
    handleEmailAuth,
    closePopup,
  };
};

export default useEmailAuth;
