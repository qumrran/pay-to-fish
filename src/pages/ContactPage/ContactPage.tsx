import React from 'react';
import { BsFillTelephoneFill, BsEnvelopeFill, BsFacebook, BsInstagram } from 'react-icons/bs';
import { FaFish } from 'react-icons/fa';
import SendButton from '../../components/SendButton.tsx/SendButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-black text-center flex items-center justify-center">
            <FaFish className="text-cyan-500 mr-5" />
            Kontakt
          </h1>
        </div>

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

        <div className="flex flex-col md:flex-row md:space-x-6">
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

          <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
            <h2 className="text-2xl font-bold text-black mb-4">Dodatkowe informacje</h2>
            <p className="mb-4 text-gray-700">
              Nasze łowisko jest dostępne dla każdego - zarówno początkujących, jak i doświadczonych wędkarzy.
              Zapewniamy doskonałe warunki do wędkowania oraz relaksu na łonie natury.
            </p>
            <p className="mb-4 text-gray-700">
              Zachęcamy do kontaktu w celu uzyskania szczegółowych informacji o dostępności miejsc, rezerwacji
              lub naszych usługach dodatkowych.
            </p>
            <p className="text-gray-700">
              Jesteśmy otwarci na każde pytanie i chętnie pomożemy w zaplanowaniu Twojej wędkarskiej przygody!
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-black mb-4">Mapa</h2>
          <iframe
            title="Mapa GPS"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.6314851115056!2d19.939383615792166!3d52.229675979759314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471f9f70fd3e98cb%3A0x74c9fef4e2bcf20!2sMazury!5e0!3m2!1spl!2spl!4v1635346781251!5m2!1spl!2spl"
            width="100%"
            height="300"
            allowFullScreen
            loading="lazy"
            className="rounded-lg border border-gray-300"
          ></iframe>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContactPage;
