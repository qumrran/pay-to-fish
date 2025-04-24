import React from 'react';
import { ForgotPasswordButtonProps } from '../../../types/ForgotPasswordButton.types';

const ForgotPasswordButton: React.FC<ForgotPasswordButtonProps> = ({ onClick }) => {
  return (
    <div className='mt-4 text-center'>
      <button className='text-cyan-500 underline' onClick={onClick}>
        Zapomniałeś hasła?
      </button>
    </div>
  );
};

export default ForgotPasswordButton;
