import { memo } from 'react';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.03,
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* Card Container */}
      <div className={`
        relative overflow-hidden rounded-2xl
        ${isPremium ? 'bg-white/10' : 'bg-white/5'}
        backdrop-blur-md border border-white/20
        p-4 h-full
        transition-all duration-300
        group-hover:border-white/40
        group-hover:shadow-lg group-hover:shadow-white/10
      `}>
        {/* Gradient Overlay */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-20
          bg-gradient-to-br ${gradient}
          transition-opacity duration-300
        `} />
        {/* Content */}
        <div className="relative z-10 flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide">
                {label}
              </p>
              <h3 className={`
                text-xl font-bold mt-1
                bg-gradient-to-r ${gradient}
                bg-clip-text text-transparent
              `}>
                {valeur}
              </h3>
            </div>
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="text-2xl"
            >
              {icon}
            </motion.div>
          </div>
          {/* Description */}
          <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
            {description}
          </p>
          {/* Premium Badge */}
          {isPremium && (
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
              <span className="text-[10px] font-medium text-yellow-400/80 uppercase tracking-wider">
                Premium
              </span>
            </div>
          )}
        </div>
        {/* Animated Border on Hover */}
        <motion.div
          className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-r ${gradient}
            opacity-0 group-hover:opacity-30
          `}
          style={{
            filter: 'blur(20px)',
            zIndex: -1
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.valeur === nextProps.valeur &&
    prevProps.isPremium === nextProps.isPremium
  );
});

PorteCard.displayName = 'PorteCard';

export default PorteCard;
