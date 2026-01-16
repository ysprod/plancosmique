'use client';

import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

type TabId = string;
interface SettingsTabsProps<T extends TabId = string> {
  tabs: readonly Tab[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
}

export default function SettingsTabs<T extends TabId = string>({ tabs, activeTab, setActiveTab }: SettingsTabsProps<T>) {
  return (
    <>
      {/* Mobile select */}
      <div className="lg:hidden">
        <select
          value={activeTab}
          onChange={e => setActiveTab(e.target.value as T)}
          className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          {tabs.map(tab => (
            <option key={tab.id} value={tab.id}>{tab.label}</option>
          ))}
        </select>
      </div>
      {/* Desktop tabs */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as T)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all mb-1 ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-50 font-medium'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
