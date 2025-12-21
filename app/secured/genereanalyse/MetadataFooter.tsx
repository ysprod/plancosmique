import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { memo } from 'react';
import type { Metadata } from './types';

const MetadataFooter = memo(({ metadata }: { metadata: Metadata }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="flex flex-wrap items-center justify-center gap-4 py-4 text-xs text-gray-500 dark:text-gray-400"
  >
    <div className="flex items-center gap-1">
      <Zap className="w-3 h-3" />
      {metadata.processingTime}s
    </div>
    <div className="flex items-center gap-1">
      <span className="font-mono">{metadata.tokensUsed.toLocaleString()} tokens</span>
    </div>
    {metadata.cached && (
      <div className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 
                    rounded-full text-[10px] font-semibold">
        CACHED
      </div>
    )}
  </motion.div>
));

MetadataFooter.displayName = 'MetadataFooter';

export default MetadataFooter;
