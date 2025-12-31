import { Filter } from 'lucide-react';
import type { KnowledgeCategory } from '@/lib/types/knowledge.types';

const categoryLabels: Record<KnowledgeCategory, string> = {
  ASTROLOGIE: 'Astrologie',
  NUMEROLOGIE: 'Numérologie',
  TAROT: 'Tarot',
  SPIRITUALITE: 'Spiritualité',
  MEDITATION: 'Méditation',
  DEVELOPPEMENT_PERSONNEL: 'Développement Personnel',
  RITUELS: 'Rituels',
  AUTRES: 'Autres',
};

export default function KnowledgeCategories({ selectedCategory, onChange }: { selectedCategory: KnowledgeCategory | 'all'; onChange: (cat: KnowledgeCategory | 'all') => void }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
          selectedCategory === 'all'
            ? 'bg-purple-500 text-white'
            : 'bg-white/10 text-gray-300 hover:bg-white/20'
        }`}
      >
        Toutes les catégories
      </button>
      {Object.entries(categoryLabels).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key as KnowledgeCategory)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
            selectedCategory === key
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
