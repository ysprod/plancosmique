import React from 'react';
import { motion } from 'framer-motion';

interface TabsNavigationProps {
  aspectTabs: Array<{ id: string; title: string; icon: React.ReactNode }>;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ aspectTabs, activeTab, setActiveTab }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8"
  >
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {aspectTabs.map((aspect) => (
        <motion.button
          key={aspect.id}
          onClick={() => setActiveTab(aspect.id)}
          className={`relative p-4 rounded-xl transition-all duration-300 ${
            activeTab === aspect.id
              ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="block mx-auto">{aspect.icon}</span>
            <span className="hidden sm:block text-xs sm:text-sm font-semibold text-center leading-tight mt-2">
              {aspect.title}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default TabsNavigation;
