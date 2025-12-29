import { motion } from 'framer-motion';

interface ActivityItemProps {
  type: string;
  user: string;
  action: string;
  time: string;
  index: number;
}

const ActivityItem = ({ type, user, action, time, index }: ActivityItemProps) => {
  const getColor = () => {
    switch (type) {
      case 'consultation': return 'bg-blue-500';
      case 'payment': return 'bg-green-500';
      case 'registration': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between py-2.5 sm:py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-lg px-2"
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`w-2 h-2 rounded-full ${getColor()} flex-shrink-0`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">{user}</p>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">{action}</p>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{time}</span>
    </motion.div>
  );
};

export default ActivityItem;
