
import React from 'react';

const Map: React.FC = () => {
  return (
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
  );
};

export default Map;
