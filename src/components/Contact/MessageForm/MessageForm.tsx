
import React from 'react';
import SendButton from '../../Shared/SendButton.tsx/SendButton';
import { toast } from 'react-toastify';

const MessageForm: React.FC = () => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success('Wiadomość została wysłana! Skontaktujemy się z Tobą wkrótce.', {
      style: {
        backgroundColor: 'black', 
        color: 'white', 
        borderRadius: '8px', 
      },
      autoClose: 1000, 
      position: 'top-center',
    });
    event.currentTarget.reset();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">Wyślij wiadomość</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Imię i nazwisko
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Wiadomość
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <SendButton />
      </form>
    </div>
  );
};

export default MessageForm;
