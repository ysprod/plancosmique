import { motion } from "framer-motion";
import { memo } from "react";

const CustomTooltip = memo(({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl 
               shadow-2xl border border-white/10"
    >
      <p className="font-bold text-sm mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="font-bold">{entry.value}</span>
        </div>
      ))}
    </motion.div>
  );
});

CustomTooltip.displayName = 'CustomTooltip';

export default CustomTooltip;