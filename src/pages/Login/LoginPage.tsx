import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import ConfirmationEmailPopup from '../../components/LoginPage/ConfirmationEmailPopup/ConfirmationEmailPopup';
import AuthButton from '../../components/LoginPage/AuthButton/AuthButton';
import GoogleAuthButton from '../../components/LoginPage/GoogleAuthButton/GoogleAuthButton';
import ForgotPasswordButton from '../../components/LoginPage/ForgotPasswordButton/ForgotPasswordButton';
import PasswordResetForm from '../../components/LoginPage/PasswordResetForm/PasswordResetForm';
import AuthSwitch from '../../components/LoginPage/AuthSwitch/AuthSwitch';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleEmailAuth = async () => {
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);

        if (fullName.trim()) {
          await updateProfile(userCredential.user, { displayName: fullName });
        }

        await auth.signOut();
        setShowPopup(true); // Pokazanie popupa z potwierdzeniem rejestracji
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Sprawdzanie weryfikacji e-maila
        if (!userCredential.user.emailVerified) {
          setError('Proszę zweryfikować swój e-mail, zanim się zalogujesz.');
          await auth.signOut(); // Wylogowanie użytkownika, jeśli email nie jest zweryfikowany
          return;
        }

        // Jeśli email jest zweryfikowany, przejdź do dashboardu
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Błąd Firebase:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Konto z tym e-mailem już istnieje! Zaloguj się.');
        setIsRegistering(false);
      } else if (err.code === 'auth/weak-password') {
        setError('Hasło musi mieć co najmniej 6 znaków.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Nieprawidłowy format e-maila.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Nieprawidłowe hasło. Spróbuj ponownie.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Nie znaleziono konta z tym e-mailem.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Nieprawidłowe dane logowania lub brak konta. Sprawdź e-mail i hasło.');
      } else {
        setError(`Wystąpił błąd: ${err.message}`);
      }
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Błąd logowania przez Google: ' + err.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError('Link do resetowania hasła został wysłany na Twój email.');
      setIsResettingPassword(false);
    } catch (err: any) {
      setError('Błąd podczas wysyłania linku resetującego: ' + err.message);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsRegistering(false);
    navigate('/login');
  };

  const handleModeChange = (mode: boolean) => {
    setIsRegistering(mode);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded w-96">
        <h1 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isRegistering && (
          <input
            type="text"
            placeholder="Imię i nazwisko"
            className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring focus:ring-cyan-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring focus:ring-cyan-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          className="w-full p-2 border mb-4 rounded focus:outline-none focus:ring focus:ring-cyan-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton onClick={handleEmailAuth} isRegistering={isRegistering} />
        <GoogleAuthButton onClick={handleGoogleAuth} />

        {!isRegistering && !isResettingPassword && (
          <ForgotPasswordButton onClick={() => setIsResettingPassword(true)} />
        )}

        {isResettingPassword && (
          <PasswordResetForm
            email={email}
            setEmail={setEmail}
            onReset={handlePasswordReset}
            onCancel={() => setIsResettingPassword(false)}
          />
        )}

        <AuthSwitch
          isRegistering={isRegistering}
          onSwitch={() => handleModeChange(!isRegistering)}
        />
      </div>

      {showPopup && <ConfirmationEmailPopup onClose={closePopup} />}
    </div>
  );
};

export default LoginPage;
