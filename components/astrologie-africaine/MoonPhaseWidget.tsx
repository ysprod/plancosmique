"use client";
import { MoonPhaseDay, useMoonPhaseData } from "@/hooks/useMoonPhaseData";
import { useMoonPhaseProcessing } from "@/hooks/useMoonPhaseProcessing";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { DetailModal } from "./DetailModal";
import { Header } from "./Header";
import { MoonPhaseExplanation } from "./MoonPhaseExplanation";
import { MoonPhaseLegend } from "./MoonPhaseLegend";


export function MoonPhaseWidget() {
  const [selectedDay, setSelectedDay] = useState<MoonPhaseDay | null>(null);

  const { monthData, loading, currentDate, handleMonthChange } = useMoonPhaseData();
  const { moonDays } = useMoonPhaseProcessing(monthData);

  const handleCloseModal = useCallback(() => {
    setSelectedDay(null);
  }, []);

  return (
    <div className="space-y-3">
      <Header
        year={currentDate.getFullYear()}
        month={currentDate.getMonth() + 1}
        onPrevMonth={() => handleMonthChange(-1)}
        onNextMonth={() => handleMonthChange(1)}
        loading={loading}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <MoonPhaseLegend />
        <MoonPhaseExplanation />
      </motion.div>

      <AnimatePresence>
        {selectedDay && <DetailModal day={selectedDay} onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
}