import { motion } from 'framer-motion';
import React, { memo } from 'react';
import type { Tab } from '@/hooks/astrologie-africaine/useAstrologieAfricainePage';

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = memo<TabButtonProps>(({ tab, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`
      relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all
      ${isActive
        ? 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-600 shadow-xl'
        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
      }
    `}
  >
    {isActive && (
      <motion.div
        layoutId="activeTabBg"
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <div className="relative z-10">
      <tab.icon
        className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${isActive ? 'text-white' : 'text-gray-700'
          }`}
      />
      <h3
        className={`font-bold text-xs sm:text-sm mb-1 ${isActive ? 'text-white' : 'text-gray-900'
          }`}
      >
        {tab.title}
      </h3>
      <p
        className={`text-xs ${isActive ? 'text-purple-50' : 'text-gray-500'
          }`}
      >
        {tab.description}
      </p>
    </div>
  </motion.button>
));

TabButton.displayName = 'TabButton';

export { TabButton };