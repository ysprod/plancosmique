import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { SacredNumber } from '@/hooks/numerologie/useSacredNumbers';

interface SacredNumberDetailsProps {
  sacredNumber: SacredNumber;
  onBack: () => void;
}

export function SacredNumberDetails({ sacredNumber, onBack }: SacredNumberDetailsProps) {
  return (
    <motion.div
      key={sacredNumber.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
    >
      {/* En-tête du nombre sacré */}
      <div className="mb-8 pb-6 border-b border-amber-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            {sacredNumber.icon}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
            {sacredNumber.title}
          </h2>
        </div>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic mb-4">
          {sacredNumber.description}
        </p>
        <p className="text-gray-600 leading-relaxed">
          {sacredNumber.introduction}
        </p>
      </div>
      {/* Comment calculer */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Comment le Calculer
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {sacredNumber.howToCalculate}
        </p>
      </div>
      {/* Significations par nombre */}
      <div className="mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4">
          📖 Significations des Nombres
        </h3>
        <div className="space-y-4">
          {Object.entries(sacredNumber.meaningByNumber).map(([num, meaning]) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: parseInt(num) * 0.05 }}
              className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white text-xl font-bold">{num}</span>
                </div>
                <p className="text-gray-700 leading-relaxed pt-2">{meaning}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Insights clés */}
      <div className="mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4">
          ✨ Points Clés à Retenir
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {sacredNumber.keyInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white border-2 border-amber-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-700 leading-relaxed">🔢 {insight}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Application pratique */}
      <div className="mb-8 p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-200">
        <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-3">
          🎯 Application Pratique
        </h3>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
          {sacredNumber.practicalApplication}
        </p>
      </div>
      {/* Affirmation */}
      <div className="p-6 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-xl border-2 border-amber-300 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">
          💫 Affirmation Numérologique
        </h3>
        <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-semibold italic">
          "{sacredNumber.affirmation}"
        </p>
      </div>
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <button
          onClick={onBack}
          className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          🔢 Calculer Mon Nombre {sacredNumber.title}
        </button>
      </motion.div>
    </motion.div>
  );
}
