'use client';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';

export default function KnowledgeTabs({ activeTab, setActiveTab }: { activeTab: 'all' | 'popular' | 'recent'; setActiveTab: (tab: 'all' | 'popular' | 'recent') => void }) {
  const tabs = [
    { value: 'all', label: 'Toutes', icon: BookOpen },
    { value: 'popular', label: 'Populaires', icon: TrendingUp },
    { value: 'recent', label: 'Récentes', icon: Clock },
  ];
  return (
    <div className="flex gap-2 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value as 'all' | 'popular' | 'recent')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === tab.value
              ? 'bg-purple-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}