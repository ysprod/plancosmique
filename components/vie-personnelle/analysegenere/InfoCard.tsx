import { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  gradient?: string;
}

const InfoCard = memo<InfoCardProps>(({
  icon: Icon,
  title,
  description,
  delay = 0,
  gradient = 'from-purple-500 via-pink-500 to-rose-500'
}) => (
  <motion.div
    initial={{ opacity: 0, x: -15, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ 
      delay,
      duration: 0.4,
      type: "spring",
      stiffness: 200
    }}
    whileHover={{ scale: 1.02, y: -2 }}
    className="group relative overflow-hidden flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-pink-50/50 to-purple-50/0 dark:from-purple-950/0 dark:via-pink-950/30 dark:to-purple-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Icon container */}
    <div className={`relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
    </div>
    
    {/* Content */}
    <div className="flex-1 min-w-0 relative z-10">
      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5 sm:mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
));

InfoCard.displayName = 'InfoCard';

export default InfoCard;
