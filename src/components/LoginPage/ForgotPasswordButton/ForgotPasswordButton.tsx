import React from 'react';

interface Props {
  onClick: () => void;
}

const ForgotPasswordButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className='mt-4 text-center'>
      <button className='text-cyan-500 underline' onClick={onClick}>
        Zapomniałeś hasła?
      </button>
    </div>
  );
};

export default ForgotPasswordButton;