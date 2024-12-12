import React from 'react';

const ContactPage: React.FC = () => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Wiadomość została wysłana! Skontaktujemy się z Tobą wkrótce.');
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Kontakt</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Wyślij wiadomość</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Imię i nazwisko</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">Wiadomość</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Wyślij
          </button>
        </form>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Informacje kontaktowe</h2>
        <p className="mb-2"><strong>Adres:</strong> Jeziorna 123, 00-000 Mazury</p>
        <p className="mb-2"><strong>Numer telefonu:</strong> +48 123 456 789</p>
        <p className="mb-2"><strong>Email:</strong> kontakt@paytofish.pl</p>
        <p className="mb-2">
          <strong>Facebook:</strong>{' '}
          <a
            href="https://facebook.com/paytofish"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            facebook.com/paytofish
          </a>
        </p>
        <p>
          <strong>Instagram:</strong>{' '}
          <a
            href="https://instagram.com/paytofish"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            instagram.com/paytofish
          </a>
        </p>
      </div>

   
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Mapa</h2>
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
  );
};

export default ContactPage;
