import React from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { UserAvatarProps } from '../../../../types/UserAvatar.types';

const UserAvatar: React.FC<UserAvatarProps> = ({ photoURL }) => {
  return (
    <div>
      {photoURL ? (
        <img
          src={photoURL}
          alt="avatar"
          className="w-12 h-12 rounded-full mb-2"
        />
      ) : (
        <FaCircleUser className="w-12 h-12 text-gray-500 mb-2" />
      )}
    </div>
  );
};

export default UserAvatar;
