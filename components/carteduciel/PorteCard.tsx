import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface PorteCardProps {
  label: string;
  valeur: string;
  description: string;
  icon: string;
  gradient: string;
  index: number;
  isPremium: boolean;
}

const PorteCard = memo<PorteCardProps>(({
  label,
  valeur,
  description,
  icon,
  gradient,
  index,
  isPremium
}) => {
   const memoizedContent = useMemo(() => ({
    label, valeur, description, icon, gradient, isPremium
  }), [label, valeur, description, icon, gradient, isPremium]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3, type: 'spring' }
      }}
      className="relative group h-full"
    >
      {/* Glow Background */}
      <motion.div
        className={`
          absolute -inset-0.5 rounded-xl sm:rounded-2xl
          bg-gradient-to-br ${gradient}
          opacity-0 group-hover:opacity-40
          blur-lg transition-opacity duration-300
          -z-10
        `}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0, 0.2, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main Card */}
      <div className={`
        relative h-full overflow-hidden rounded-xl sm:rounded-2xl
        backdrop-blur-xl
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        border border-white/20
        group-hover:border-white/40 group-hover:bg-white/[0.12]
        p-4 sm:p-5
        transition-all duration-300
        flex flex-col justify-between
        shadow-lg shadow-black/20
        group-hover:shadow-xl group-hover:shadow-purple-500/20
      `}>
        
        {/* Animated Gradient Overlay on Hover */}
        <motion.div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-15
            bg-gradient-to-br ${gradient}
            transition-opacity duration-300
          `}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full gap-3">
          
          {/* Header: Label & Icon */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-[11px] sm:text-xs font-semibold text-white/50 uppercase tracking-widest"
              >
                {memoizedContent.label}
              </motion.p>
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`
                  text-lg sm:text-2xl font-black mt-2
                  bg-gradient-to-r ${gradient}
                  bg-clip-text text-transparent
                  leading-tight
                `}
              >
                {memoizedContent.valeur}
              </motion.h3>
            </div>

            {/* Animated Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.15, type: 'spring' }}
              whileHover={{ 
                rotate: 360, 
                scale: 1.3,
                filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.8))',
                transition: { duration: 0.6, type: 'spring' }
              }}
              className="text-2xl sm:text-3xl flex-shrink-0"
            >
              {memoizedContent.icon}
            </motion.div>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.35 }}
            className="text-[10px] sm:text-xs text-white/60 leading-relaxed line-clamp-2"
          >
            {memoizedContent.description}
          </motion.p>

          {/* Premium Badge */}
          {memoizedContent.isPremium && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/10"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm"
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
              </motion.div>
              <span className="text-[9px] sm:text-xs font-bold text-amber-400/90 uppercase tracking-widest">
                Premium
              </span>
            </motion.div>
          )}
        </div>

        {/* Shimmer Effect on Hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          animate={{
            backgroundPosition: ['200% 0%', '-200% 0%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%'
          }}
        />
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.valeur === nextProps.valeur &&
    prevProps.label === nextProps.label &&
    prevProps.isPremium === nextProps.isPremium &&
    prevProps.icon === nextProps.icon
  );
});

PorteCard.displayName = 'PorteCard';

export default PorteCard;