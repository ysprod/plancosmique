import React from 'react';
import { motion } from 'framer-motion';

interface AspectExercisesProps {
  practicalExercise: string[];
}

const AspectExercises: React.FC<AspectExercisesProps> = ({ practicalExercise }) => (
  <div className="mb-8">
    <h3 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4">
      🎯 Exercice Pratique Immédiat
    </h3>
    <div className="space-y-3">
      {practicalExercise.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">{index + 1}</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{step}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AspectExercises;
