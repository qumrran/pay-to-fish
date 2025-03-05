
import React from 'react';

const AdditionalInfo: React.FC = () => {
  return (
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
  );
};

export default AdditionalInfo;
