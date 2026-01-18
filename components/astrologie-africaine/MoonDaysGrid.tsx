"use client";
import { motion } from "framer-motion";
import { memo } from "react";
import { DayCard } from "./DayCard";
import { MoonPhaseDay } from "@/hooks/useMoonPhaseData";
import { containerVariants } from "./moonPhaseVariants";
 

interface MoonDaysGridProps {
  moonDays: MoonPhaseDay[];
  currentDate: Date;
  onDayClick: (day: MoonPhaseDay) => void;
}

export const MoonDaysGrid = memo<MoonDaysGridProps>(({ moonDays, currentDate, onDayClick }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={`${currentDate.getMonth()}-${currentDate.getFullYear()}`}
      className="grid grid-cols-1 sm:grid-cols-7 px-4 py-4 gap-1.5"
    >
      {moonDays.map((day) => (
        <DayCard
          key={`${day.day}-${day.illumination}`}
          day={day}
          onClick={() => onDayClick(day)}
        />
      ))}
    </motion.div>
  );
});

MoonDaysGrid.displayName = "MoonDaysGrid";