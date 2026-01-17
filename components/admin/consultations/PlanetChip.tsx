'use client';
import { motion } from "framer-motion";
import { memo } from "react";
import { PLANET_GRADIENTS, SIGN_COLORS} from "./DisplayConsultationCard.utils";
import { cx } from "@/lib/functions";

const PlanetChip = memo(({ planete, signe, maison, retrograde }: any) => {
  const gradient = PLANET_GRADIENTS[planete] || "from-gray-400 to-gray-600";
  const signColor = SIGN_COLORS[signe] || "bg-gray-100 text-gray-800 border-gray-200";
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={cx(
        "relative inline-flex items-center gap-2 rounded-full px-3 py-2",
        "border shadow-sm backdrop-blur-sm transition-all duration-200",
        signColor
      )}
    >
      <div className={cx("h-2 w-2 rounded-full bg-gradient-to-r", gradient)} />
      <span className="text-[11px] font-extrabold">{planete}</span>
      <span className="text-[10px] font-medium opacity-75">· {signe}</span>
      <span className="text-[10px] font-bold text-slate-600">M{maison}</span>
      {retrograde && (
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="ml-1 text-[10px] font-black text-red-500"
        >
          ℞
        </motion.span>
      )}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
});
PlanetChip.displayName = "PlanetChip";

export default PlanetChip;