import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Zap, Moon } from 'lucide-react';
import { itemVariants } from './resultDisplayConstants';

interface GeneralForecastCardProps {
  generalForecast: string;
  prefersReducedMotion: boolean | null;
}

export const GeneralForecastCard = memo<GeneralForecastCardProps>(({
  generalForecast,
  prefersReducedMotion
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
                 rounded-3xl p-6 border-2 border-purple-200 overflow-hidden group"
    >
      {/* Animated background pattern */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-11 h-11 bg-gradient-to-br from-purple-600 to-pink-600 
                     rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-lg">Prévisions Générales</h4>
            <div className="flex items-center gap-1 mt-1">
              <Sun className="w-3 h-3 text-amber-500" />
              <Zap className="w-3 h-3 text-purple-500" />
              <Moon className="w-3 h-3 text-indigo-500" />
            </div>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          {generalForecast}
        </p>
      </div>
    </motion.div>
  );
});

GeneralForecastCard.displayName = 'GeneralForecastCard';
