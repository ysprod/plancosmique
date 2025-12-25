import { motion } from "framer-motion";
import { memo } from "react";

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  })
};

const StatBadge = memo(({
  icon: Icon,
  label,
  value,
  gradient,
  index = 0
}: {
  icon: any;
  label: string;
  value: string | number;
  gradient: string;
  index?: number;
}) => (
  <motion.div
    custom={index}
    variants={statVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.05, y: -2 }}
    className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} 
               border border-white/20 shadow-lg overflow-hidden`}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />

    <div className="relative z-10 flex items-center gap-2">
      <Icon className="w-4 h-4 text-white flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-white/80 font-medium">{label}</p>
        <p className="text-sm font-bold text-white truncate">{value}</p>
      </div>
    </div>
  </motion.div>
));

StatBadge.displayName = 'StatBadge';

export default StatBadge;