import React from 'react';
import { motion } from 'framer-motion';

interface AspectLearningsProps {
  whatYouLearn: string[];
}

const AspectLearnings: React.FC<AspectLearningsProps> = ({ whatYouLearn }) => (
  <div className="mb-8">
    <h3 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4">
      📚 Ce Que Vous Allez Apprendre
    </h3>
    <div className="grid sm:grid-cols-2 gap-4">
      {whatYouLearn.map((learning, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-white border-2 border-purple-200 rounded-lg hover:shadow-lg transition-shadow"
        >
          <p className="text-gray-700 leading-relaxed">✨ {learning}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AspectLearnings;
