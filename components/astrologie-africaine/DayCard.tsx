'use client';
import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { getPhaseConfig } from "./moonPhaseUtils";
import { useReducedMotion } from "framer-motion";

interface DayCardProps {
  day: any;
  onClick: () => void;
}

const dayVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const DayCard = memo<DayCardProps>(({ day, onClick }) => {
  const phaseConfig = useMemo(() => getPhaseConfig(day.phaseName), [day.phaseName]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      variants={dayVariants}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative p-1.5 sm:p-2 rounded-lg
        ${day.isToday 
          ? 'bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border-2 border-yellow-400/50 shadow-md' 
          : 'bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
        }
        ${!day.isToday && 'border border-gray-200 hover:border-purple-300'}
        transition-all shadow-sm hover:shadow
        aspect-square mb-12 sm:mb-16
        w-10 h-10 sm:w-14 sm:h-14
      `}
    >
      <div className={`text-[11px] font-bold ${day.isToday ? 'text-yellow-600' : 'text-gray-900'}`}>
        {day.day}
      </div>
      <div 
        dangerouslySetInnerHTML={{ __html: day.svg }}
        className="w-6 h-6 sm:w-8 sm:h-8"
      />
      {(day.isNew || day.isFull) && (
        <>
          {/* Halo cosmique animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: [0.7, 0.9, 0.7],
              scale: [1, 1.25, 1],
              boxShadow: [
                '0 0 0px 0px #fff0',
                `0 0 16px 8px ${day.isFull ? '#ffe066' : '#a5b4fc'}`,
                '0 0 0px 0px #fff0'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2.5 -right-2.5 w-10 h-10 rounded-full pointer-events-none z-10"
            style={{
              background: day.isFull
                ? 'radial-gradient(circle, #fffbe6 0%, #ffe06644 60%, transparent 100%)'
                : 'radial-gradient(circle, #e0e7ff 0%, #a5b4fc44 60%, transparent 100%)'
            }}
          />
          {/* Badge lunaire */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${phaseConfig.badge} flex items-center justify-center shadow-md border border-white/40 z-20 animate-glow`}
            style={{
              boxShadow: day.isFull
                ? '0 0 12px 4px #ffe06699, 0 0 32px 8px #fffbe699'
                : '0 0 12px 4px #a5b4fc99, 0 0 32px 8px #e0e7ff99'
            }}
          >
            <span className="text-[13px] animate-pulse drop-shadow-lg">{phaseConfig.emoji}</span>
          </motion.div>
        </>
      )}
      {day.isToday && (
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -left-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md"
        >
          Auj
        </motion.div>
      )}
    </motion.button>
  );
});

DayCard.displayName = "DayCard";