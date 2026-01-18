"use client";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useActivityItems } from "@/hooks/admin/useActivityItems";
import { activityCardVariants } from "./activity/animations";
import ActivityBackground from "./activity/ActivityBackground";
import ActivityHeader from "./activity/ActivityHeader";
import ActivityCardItem from "./activity/ActivityCardItem";

interface ActivitySectionProps {
  stats: any;
  derivedStats: any;
}

const ActivitySection = memo<ActivitySectionProps>(({ stats, derivedStats }) => {
  const activityItems = useActivityItems(stats, derivedStats);

  return (
    <motion.section
      variants={activityCardVariants}
      initial="hidden"
      animate="visible"
      className="relative rounded-2xl p-4 sm:p-6 text-white shadow-2xl overflow-hidden
        bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
        dark:from-blue-600 dark:via-blue-700 dark:to-blue-900
        border border-blue-400/20 dark:border-blue-500/20"
    >
      <ActivityBackground />
      <div className="relative z-10 space-y-4">
        <ActivityHeader />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {activityItems.map((item, index) => (
            <ActivityCardItem key={`${item.label}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.stats === nextProps.stats &&
    prevProps.derivedStats === nextProps.derivedStats
  );
});

ActivitySection.displayName = "ActivitySection";

export default ActivitySection;