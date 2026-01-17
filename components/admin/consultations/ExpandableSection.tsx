'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { memo, useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  content: React.ReactNode;
  icon: any;
  iconColor?: string;
  badge?: string;
}

const ExpandableSection = memo(({ title, content, icon: Icon, iconColor = "text-purple-600", badge }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div layout className="mb-1.5 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-2 p-2 rounded-lg
         bg-gradient-to-r from-purple-50/50 to-pink-50/50 
         dark:from-purple-900/10 dark:to-pink-900/10
         border border-purple-200/50 dark:border-purple-800/50
         hover:from-purple-50 hover:to-pink-50
         dark:hover:from-purple-900/20 dark:hover:to-pink-900/20
         transition-all group"
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <Icon className={`w-3 h-3 flex-shrink-0 ${iconColor}`} />
          <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </span>
          {badge && (
            <span className="text-[7px] font-bold px-1 py-0.5 rounded-full bg-yellow-400 text-yellow-900">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown className={`w-3 h-3 text-purple-600 dark:text-purple-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ExpandableSection.displayName = 'ExpandableSection';

export default ExpandableSection;