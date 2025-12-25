import { motion } from "framer-motion";
import { memo } from "react";

const InfoItem = memo(({
  icon: Icon,
  value,
  iconColor,
  index = 0
}: {
  icon: any;
  value: string;
  iconColor: string;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-1.5 px-3 py-2 rounded-xl 
             bg-white/5 backdrop-blur-sm border border-white/10
             hover:bg-white/10 transition-all shadow-sm"
  >
    <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
    <span className="text-xs text-white/90 font-medium truncate">{value}</span>
  </motion.div>
));
InfoItem.displayName = 'InfoItem';

export default InfoItem;