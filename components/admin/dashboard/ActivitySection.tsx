"use client";
import { memo } from "react";
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
    <motion.div
      variants={activityCardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden"
    >
      <ActivityBackground />
      <div className="relative z-10">
        <ActivityHeader />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {activityItems.map((item, index) => (
            <ActivityCardItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

ActivitySection.displayName = "ActivitySection";

export default ActivitySection;