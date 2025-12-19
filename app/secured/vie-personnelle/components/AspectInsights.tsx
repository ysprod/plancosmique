import React from 'react';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';

interface AspectInsightsProps {
  keyInsights: string[];
}

const AspectInsights: React.FC<AspectInsightsProps> = ({ keyInsights }) => (
  <div className="mb-8">
    <h3 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4 flex items-center gap-2">
      <Sparkle className="w-6 h-6" />
      Ce Que Vous Découvrirez
    </h3>
    <div className="grid gap-3">
      {keyInsights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-lg"
        >
          <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{insight}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AspectInsights;
