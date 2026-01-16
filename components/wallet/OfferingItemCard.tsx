'use client';

import { motion } from "framer-motion";
import { getCategoryConfig } from './utils';

interface OfferingItemCardProps {
  item: any;
  index: number;
}

const OfferingItemCard = ({ item, index }: OfferingItemCardProps) => {
  const categoryConfig = getCategoryConfig(item.category);
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700/70 dark:hover:to-gray-800/70 border border-gray-200 dark:border-gray-600 transition-all duration-300"
    >
      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}>
        <span className="text-2xl filter drop-shadow-sm">{item.icon}</span>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm">
          <span className="text-[10px] font-bold text-white">{item.quantity}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${categoryConfig.color} whitespace-nowrap`}>{categoryConfig.label}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{typeof item.quantity === 'number' && typeof item.price === 'number' ? `${item.quantity} × ${item.price.toLocaleString()} FCFA` : '—'}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-bold text-purple-600 dark:text-purple-400">{typeof item.quantity === 'number' && typeof item.price === 'number' ? (item.quantity * item.price).toLocaleString() : '—'}</p>
        <p className="text-[10px] text-gray-400 dark:text-gray-500">FCFA</p>
      </div>
    </motion.div>
  );
};
export default OfferingItemCard;
