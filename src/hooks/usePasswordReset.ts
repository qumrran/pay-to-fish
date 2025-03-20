import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const usePasswordReset = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handlePasswordReset = async (email: string) => {
    if (!email) {
      setError('Podaj adres e-mail.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Jeśli podany adres e-mail istnieje w bazie, link do resetowania hasła został wysłany.');
      setError('');
      setIsResettingPassword(false);
    } catch (err: any) {
      setError('Błąd podczas wysyłania linku resetującego: ' + err.message);
    }
  };

  return {
    error,
    successMessage,
    isResettingPassword,
    setIsResettingPassword,
    handlePasswordReset,
  };
};

export default usePasswordReset;