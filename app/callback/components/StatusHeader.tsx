import { motion, type Variants } from 'framer-motion';
import type { StatusConfig } from './types';

interface StatusHeaderProps {
  status: string;
  statusConfig: StatusConfig;
  itemVariants: Variants | undefined;
  pulseVariants: Variants | undefined;
}

export function StatusHeader({ status, statusConfig, itemVariants, pulseVariants }: StatusHeaderProps) {
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`bg-gradient-to-r ${statusConfig.gradient} p-5 sm:p-8 text-center relative overflow-hidden`}>
      <motion.div
        className="absolute inset-0 bg-white/20"
        animate={{
          x: ['0%', '100%'],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        variants={pulseVariants}
        animate={status === 'pending' ? 'pulse' : ''}
        className="relative inline-block mb-3 sm:mb-6"
      >
        <div className={`${statusConfig.iconBg} rounded-full p-3 sm:p-6 inline-block`}>
          <StatusIcon className={`w-10 h-10 sm:w-16 sm:h-16 ${statusConfig.iconColor}`} />
        </div>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className={`text-xl sm:text-3xl md:text-4xl font-bold ${statusConfig.color} mb-2`}
      >
        {statusConfig.title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-gray-700 text-xs sm:text-base md:text-lg max-w-xl mx-auto px-2"
      >
        {statusConfig.description}
      </motion.p>
    </div>
  );
}
