import React from "react";
// TODO: Adapter l'import selon l'emplacement réel des interfaces et données
// import { rubriques, consultations, offerings } from "@/lib/data";

// Placeholder: à remplacer par les vraies données du projet
const rubriques = [
  { id: "astro", label: "Astrologie", sousRubriques: [
    { id: "astro-west", label: "Astro occidentale" },
    { id: "astro-ch", label: "Astro chinoise" },
  ]},
  { id: "tarot", label: "Tarot", sousRubriques: [
    { id: "tarot-marseille", label: "Tarot de Marseille" },
  ]},
];
const consultations = [
  { id: "c1", titre: "Thème astral", rubrique: "astro", sousRubrique: "astro-west", offrandes: ["o1", "o2"] },
  { id: "c2", titre: "Voyance tarot", rubrique: "tarot", sousRubrique: "tarot-marseille", offrandes: ["o3"] },
];
const offerings = [
  { id: "o1", nom: "Bougie", prix: 10 },
  { id: "o2", nom: "Encens", prix: 5 },
  { id: "o3", nom: "Cristal", prix: 20 },
];

function AssociationsConsultationsOffrandes() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      {rubriques.map((rub) => (
        <div key={rub.id} className="mb-6">
          <h3 className="text-lg font-semibold text-cosmic-700 mb-2">{rub.label}</h3>
          {rub.sousRubriques.map((sous) => (
            <div key={sous.id} className="ml-4 mb-3">
              <div className="font-medium text-cosmic-600">{sous.label}</div>
              <ul className="ml-4 list-disc">
                {consultations.filter(c => c.rubrique === rub.id && c.sousRubrique === sous.id).map((c) => (
                  <li key={c.id} className="mb-1">
                    <span className="font-semibold">{c.titre}</span>
                    {c.offrandes && c.offrandes.length > 0 && (
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">[
                        {c.offrandes.map(oid => {
                          const off = offerings.find(o => o.id === oid);
                          return off ? `${off.nom} (${off.prix}€)` : oid;
                        }).join(', ')}
                      ]</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AssociationsConsultationsOffrandes;
