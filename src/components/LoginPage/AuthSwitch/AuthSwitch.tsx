import React from 'react';
import { AuthSwitchProps } from '../../../types/AuthSwitch.types';

const AuthSwitch: React.FC<AuthSwitchProps> = ({ isRegistering, onSwitch }) => {
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
