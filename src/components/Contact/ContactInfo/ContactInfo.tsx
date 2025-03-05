
import React from 'react';
import { BsFillTelephoneFill, BsEnvelopeFill, BsFacebook, BsInstagram } from 'react-icons/bs';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 flex-1">
      <h2 className="text-2xl font-bold text-black mb-4">Informacje kontaktowe</h2>
      <p className="mb-4 flex items-center text-gray-700">
        <BsFillTelephoneFill className="mr-2 text-xl text-cyan-500" />
        <strong className="text-black">Numer telefonu:</strong>
        <span className="ml-2">+48 123 456 789</span>
      </p>
      <p className="mb-4 flex items-center text-gray-700">
        <BsEnvelopeFill className="mr-2 text-xl text-cyan-500" />
        <strong className="text-black">Email:</strong>
        <span className="ml-2">kontakt@paytofish.pl</span>
      </p>
      <p className="mb-4 flex items-center text-gray-700">
        <BsFacebook className="mr-2 text-2xl text-cyan-500" />
        <strong className="text-black">Facebook:</strong>
        <a
          href="https://facebook.com/paytofish"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-blue-500 underline"
        >
          facebook.com/paytofish
        </a>
      </p>
      <p className="flex items-center text-gray-700">
        <BsInstagram className="mr-2 text-2xl text-cyan-500" />
        <strong className="text-black">Instagram:</strong>
        <a
          href="https://instagram.com/paytofish"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-blue-500 underline"
        >
          instagram.com/paytofish
        </a>
      </p>
    </div>
  );
};

export default ContactInfo;
