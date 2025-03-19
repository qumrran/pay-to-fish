import React from 'react';

interface Props {
  isRegistering: boolean;
  onSwitch: () => void;
}

const AuthSwitch: React.FC<Props> = ({ isRegistering, onSwitch }) => {
  return (
    <div className='mt-4 text-center'>
      {isRegistering ? (
        <p>
          Masz już konto?{' '}
          <button className='text-cyan-500 underline' onClick={onSwitch}>
            Zaloguj się
          </button>
        </p>
      ) : (
        <p>
          Nie masz konta?{' '}
          <button className='text-cyan-500 underline' onClick={onSwitch}>
            Zarejestruj się
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthSwitch;