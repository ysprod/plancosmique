import React from 'react';
import { motion } from 'framer-motion';
import useHoroscopeTabs, { HoroscopeTypeId, Tab } from '@/hooks/horoscope/useHoroscopeTabs';

interface HoroscopeTabsProps {
  activeTab: HoroscopeTypeId;
  onTabChange: (tabId: HoroscopeTypeId) => void;
}

const HoroscopeTabs: React.FC<HoroscopeTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = useHoroscopeTabs();
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-3 rounded-xl border-2 transition-all ${activeTab === tab.id
              ? 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-600 text-white shadow-lg'
              : 'bg-white border-gray-200 hover:border-purple-300 text-gray-700'
              }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative z-10 text-center">
              <tab.icon
                className={`w-5 h-5 mx-auto mb-1 ${activeTab === tab.id ? 'text-white' : 'text-gray-600'}`}
              />
              <div className={`font-bold text-sm ${activeTab === tab.id ? 'text-white' : 'text-gray-900'}`}>{tab.title}</div>
              <div className={`text-xs mt-0.5 ${activeTab === tab.id ? 'text-purple-100' : 'text-gray-500'}`}>{tab.subtitle}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default HoroscopeTabs;
