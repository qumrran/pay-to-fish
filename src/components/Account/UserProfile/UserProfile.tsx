import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { UserProfileProps } from "../../../types/UserProfile.types";

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-4 shadow-lg"
        />
      ) : (
        <FaCircleUser className="w-24 h-24 text-gray-500 mb-4" />
      )}
      <h1 className="text-4xl font-bold mb-4 text-center">Moje Konto</h1>
      <p className="text-lg text-center mb-6">
        Witaj, {user?.displayName ?? "Użytkowniku"}!
      </p>
      <h2 className="text-xl font-bold mb-4">Twoje Rezerwacje</h2>
    </div>
  );
};

export default UserProfile;
