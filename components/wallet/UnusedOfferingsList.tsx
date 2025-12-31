import { motion } from 'framer-motion';
import { getCategoryConfig } from './utils';
import type { OfferingDetails } from '@/app/secured/wallet/page';

interface UnusedOfferingsListProps {
  unusedOfferings: any[];
  isLoadingUnused: boolean;
  unusedError: string | null;
}

export default function UnusedOfferingsList({ unusedOfferings, isLoadingUnused, unusedError }: UnusedOfferingsListProps) {
  if (isLoadingUnused) {
    return <div className="text-gray-400 dark:text-gray-500 italic animate-pulse text-center">Chargement...</div>;
  }
  if (unusedError) {
    return <div className="text-red-500 dark:text-red-400 italic text-center">{unusedError}</div>;
  }
  if (unusedOfferings.length === 0) {
    return <div className="text-gray-400 dark:text-gray-500 italic text-center">Aucune offrande à afficher</div>;
  }
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {unusedOfferings.map((item, idx) => {
        const o = item.offering as OfferingDetails;
        const category = getCategoryConfig(o?.category || "animal");
        return (
          <motion.div
            key={o?._id || idx}
            whileHover={{ y: -4, boxShadow: "0 8px 32px 0 rgba(80,0,80,0.10)" }}
            className={`relative bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all p-5 flex flex-col gap-2`}
          >
            <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              x{item.quantity}
            </span>
            <div className="text-5xl mb-2 text-center select-none">{o?.icon || "📦"}</div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{o?.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${category.color}`}>{category.label}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 min-h-[32px]">{o?.description}</p>
            <div className="text-center mb-1">
              <span className="text-base font-bold text-purple-600 dark:text-purple-300">{o?.price?.toLocaleString()} F</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
