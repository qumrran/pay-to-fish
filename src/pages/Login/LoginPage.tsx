import React from 'react';
import useEmailAuth from '../../hooks/useEmailAuth';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import usePasswordReset from '../../hooks/usePasswordReset';
import ConfirmationEmailPopup from '../../components/LoginPage/ConfirmationEmailPopup/ConfirmationEmailPopup';
import AuthButton from '../../components/LoginPage/AuthButton/AuthButton';
import GoogleAuthButton from '../../components/LoginPage/GoogleAuthButton/GoogleAuthButton';
import ForgotPasswordButton from '../../components/LoginPage/ForgotPasswordButton/ForgotPasswordButton';
import PasswordResetForm from '../../components/LoginPage/PasswordResetForm/PasswordResetForm';
import AuthSwitch from '../../components/LoginPage/AuthSwitch/AuthSwitch';

const LoginPage: React.FC = () => {
  const {
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
  } = useEmailAuth();

  const { handleGoogleAuth } = useGoogleAuth();
  const { isResettingPassword, setIsResettingPassword, handlePasswordReset, error: resetError, successMessage } = usePasswordReset();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded w-96">
        <h1 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
        </h1>

        {(error || resetError) && <p className="text-red-500 mb-4">{error || resetError}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        {isRegistering && (
          <input
            type="text"
            placeholder="Imię i nazwisko"
            className="w-full p-2 border mb-2 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        <input type="email" placeholder="Email" className="w-full p-2 border mb-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Hasło" className="w-full p-2 border mb-4 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />

        <AuthButton onClick={handleEmailAuth} isRegistering={isRegistering} />
        <GoogleAuthButton onClick={handleGoogleAuth} />

        {!isRegistering && !isResettingPassword && <ForgotPasswordButton onClick={() => setIsResettingPassword(true)} />}
        {isResettingPassword && <PasswordResetForm email={email} setEmail={setEmail} onReset={() => handlePasswordReset(email)} onCancel={() => setIsResettingPassword(false)} />}

        <AuthSwitch isRegistering={isRegistering} onSwitch={() => setIsRegistering(!isRegistering)} />
      </div>

      {showPopup && <ConfirmationEmailPopup onClose={closePopup} />}
    </div>
  );
};

export default LoginPage;
