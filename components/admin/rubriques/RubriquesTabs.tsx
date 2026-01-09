import React from 'react';

type RubriquesTabsProps = {
  activeTab: 'gestion' | 'overview';
  setActiveTab: (tab: 'gestion' | 'overview') => void;
};

export const RubriquesTabs: React.FC<RubriquesTabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="mb-6 flex gap-2">
    <button
      className={`px-4 py-2 rounded-t-lg font-semibold transition border-b-2 ${activeTab === 'gestion' ? 'bg-white border-violet-500 text-violet-800' : 'bg-violet-50 border-transparent text-violet-500 hover:bg-violet-100'}`}
      onClick={() => setActiveTab('gestion')}
    >
      Gestion des rubriques
    </button>
    <button
      className={`px-4 py-2 rounded-t-lg font-semibold transition border-b-2 ${activeTab === 'overview' ? 'bg-white border-fuchsia-500 text-fuchsia-800' : 'bg-fuchsia-50 border-transparent text-fuchsia-500 hover:bg-fuchsia-100'}`}
      onClick={() => setActiveTab('overview')}
    >
      Vue d'Ensemble
    </button>
  </div>
);
