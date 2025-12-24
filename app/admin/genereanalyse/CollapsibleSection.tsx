import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { memo, useMemo, useState } from 'react';

const CollapsibleSection = memo(({
  title,
  content,
  index
}: {
  title: string;
  content: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  const formattedContent = useMemo(() => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('### ')) {
          return <h4 key={i} className="text-base font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
            {line.replace('### ', '')}
          </h4>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={i} className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-5 mb-3">
            {line.replace('## ', '')}
          </h3>;
        }
        if (line.includes('**')) {
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="font-semibold text-gray-900 dark:text-gray-100">
                  {part.slice(2, -2)}
                </strong>
                : part
            )}
          </p>;
        }
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <li key={i} className="text-sm text-gray-700 dark:text-gray-300 ml-4 mb-1">
            {line.substring(2)}
          </li>;
        }
        if (/^\d+\./.test(line)) {
          return <li key={i} className="text-sm text-gray-700 dark:text-gray-300 ml-4 mb-1">
            {line.substring(line.indexOf('.') + 1).trim()}
          </li>;
        }
        if (line.trim() === '') {
          return <div key={i} className="h-2" />;
        }
        return <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
          {line}
        </p>;
      });
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 text-left">
          {title}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-2 max-h-[500px] overflow-y-auto">
              {formattedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

CollapsibleSection.displayName = 'CollapsibleSection';

export default CollapsibleSection;