'use client';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { SacredNumber } from '@/hooks/numerologie/useSacredNumbers';

interface NumerologyTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sacredNumbers: SacredNumber[];
}

export function NumerologyTabs({ activeTab, setActiveTab, sacredNumbers }: NumerologyTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Onglet Calculateur */}
        <motion.button
          layoutId={activeTab === 'calculator' ? "activeTab" : undefined}
          onClick={() => setActiveTab('calculator')}
          className={`relative p-4 rounded-xl transition-all duration-300 ${activeTab === 'calculator'
            ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg scale-105'
            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-2">
            <Calculator className="w-5 h-5" />
            <span className="text-xs sm:text-sm font-semibold text-center leading-tight">
              Calculateur
            </span>
          </div>
        </motion.button>
        {/* Onglets Nombres Sacrés */}
        {sacredNumbers.map((number) => (
          <motion.button
            key={number.id}
            layoutId={activeTab === number.id ? "activeTab" : undefined}
            onClick={() => setActiveTab(number.id)}
            className={`relative p-4 rounded-xl transition-all duration-300 ${activeTab === number.id
              ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg scale-105'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-2">
              {number.icon}
              <span className="text-xs sm:text-sm font-semibold text-center leading-tight">
                {number.title}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
