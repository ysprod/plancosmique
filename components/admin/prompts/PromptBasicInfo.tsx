import React from "react";

interface PromptBasicInfoProps {
  title?: string;
  description?: string;
  frequence?: string;
  participants?: string;
  rubriqueTitle?: string;
  offering?: { alternatives?: Array<{ _id: string; category: string; quantity: number }> };
}

const PromptBasicInfo: React.FC<PromptBasicInfoProps> = ({ title, description, frequence, participants, rubriqueTitle, offering }) => (
  <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-4 shadow">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Informations de la consultation</h2>
    {title && (
      <div className="mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Titre</div>
        <div className="font-bold text-base text-gray-900 dark:text-white">{title}</div>
      </div>
    )}
    {description && (
      <div className="mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Description</div>
        <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">{description}</div>
      </div>
    )}
    <div className="mb-2 flex flex-wrap gap-4">
      {frequence && (
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Fréquence : </span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{frequence}</span>
        </div>
      )}
      {participants && (
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Participants : </span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{participants}</span>
        </div>
      )}
      {rubriqueTitle && (
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Rubrique : </span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{rubriqueTitle}</span>
        </div>
      )}
    </div>
    {Array.isArray(offering?.alternatives) && offering.alternatives.length > 0 && (
      <div className="mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Offrandes requises</div>
        <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-200">
          {offering.alternatives.map((alt) => (
            <li key={alt._id}>
              {alt.category} × {alt.quantity}
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
);

export default PromptBasicInfo;
