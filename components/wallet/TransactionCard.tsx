import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Package, ChevronDown, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import OfferingItemCard from "./OfferingItemCard";
import { normalizeItem, getCategoryConfig } from './utils';

import type { Transaction } from '@/components/wallet/page/types';

interface TransactionCardProps {
  transaction: Transaction;
  index: number;
}

const TransactionCard = ({ transaction, index }: TransactionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSimulated = transaction.paymentMethod === "simulation";
  const normalizedItems = useMemo(() => transaction.items.map(normalizeItem), [transaction.items]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">{transaction.transactionId}</p>
            {isSimulated && (
              <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Simulé
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(transaction.completedAt).toLocaleString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{transaction.totalAmount.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">FCFA</p>
        </div>
      </div>
      <div className="space-y-2">
        {!isExpanded && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex -space-x-2">
              {normalizedItems.slice(0, 3).map((item, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm border-2 border-white dark:border-gray-800 shadow-sm">
                  {item.icon}
                </div>
              ))}
              {normalizedItems.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold border-2 border-white dark:border-gray-800 shadow-sm text-gray-600 dark:text-gray-400">+{normalizedItems.length - 3}</div>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{normalizedItems.map(i => i.name).slice(0, 2).join(", ")}{normalizedItems.length > 2 && "..."}</span>
          </div>
        )}
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            {normalizedItems.length} offrande(s)
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-2 overflow-hidden">
              {normalizedItems.map((item, idx) => (
                <OfferingItemCard key={(' _id' in item && typeof (item as any)._id === 'string') ? (item as any)._id : String(idx)} item={item} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default TransactionCard;
