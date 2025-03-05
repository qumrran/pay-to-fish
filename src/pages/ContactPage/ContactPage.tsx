
import React from 'react';
import Header from '../../components/Contact/Header/Header';
import MessageForm from '../../components/Contact/MessageForm/MessageForm';
import ContactInfo from '../../components/Contact/ContactInfo/ContactInfo';
import AdditionalInfo from '../../components/Contact/AdditionalInfo/AdditionalInfo';
import Map from '../../components/Contact/Map/Map';
import { ToastContainer } from 'react-toastify';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <Header />
        <MessageForm />
        <div className="flex flex-col md:flex-row md:space-x-6">
          <ContactInfo />
          <AdditionalInfo />
        </div>
        <Map />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
