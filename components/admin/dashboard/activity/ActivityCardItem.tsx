"use client";
import { motion } from "framer-motion";
import { memo } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface ActivityItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  percent: string;
  trend?: number;
}

const ActivityCardItem = memo(({ item, index }: { item: ActivityItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    whileHover={{ scale: 1.03 }}
    className="bg-white/15 rounded-lg p-3 backdrop-blur-md border border-white/20 shadow-md transition-transform"
  >
    <div className="flex items-center gap-1.5 mb-1.5">
      <item.icon className="w-3.5 h-3.5 text-white/80" />
      <p className="text-white/90 text-xs font-medium">{item.label}</p>
    </div>
    <div className="flex items-center gap-1.5">
      <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
      {item.trend !== undefined &&
        (item.trend >= 0 ? (
          <ArrowUpRight className="w-5 h-5" />
        ) : (
          <ArrowDownRight className="w-5 h-5" />
        ))}
    </div>
    <p className="text-white/70 text-xs mt-0.5">{item.percent}</p>
  </motion.div>
));

ActivityCardItem.displayName = "ActivityCardItem";

export default ActivityCardItem;