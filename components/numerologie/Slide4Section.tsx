
import React from 'react';

interface Slide4SectionProps {
  rubriqueId: string;
  typeconsultation: string;
}

const Slide4Section: React.FC<Slide4SectionProps> = ({ rubriqueId, typeconsultation }) => {
  return (
    <div className="p-8 text-center text-gray-500">
      <h2 className="text-2xl font-bold mb-4">Section numérologie à implémenter</h2>
      <p>Le composant <b>Slide4Section</b> pour la numérologie n'est pas encore développé.<br/>Ajoutez ici la logique et l'UI adaptée à la rubrique.</p>
      <div className="mt-4 text-xs text-gray-400">
        <div>rubriqueId: <span className="font-mono">{rubriqueId}</span></div>
        <div>typeconsultation: <span className="font-mono">{typeconsultation}</span></div>
      </div>
    </div>
  );
};

export default Slide4Section;
