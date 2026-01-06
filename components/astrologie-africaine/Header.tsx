import React, { memo } from "react";
import { motion } from "framer-motion";
import { Moon, Zap, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface HeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  loading: boolean;
}

export const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
] as const;

export const Header = memo<HeaderProps>(({ year, month, onPrevMonth, onNextMonth, loading }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-purple-900/70 to-slate-950 p-3 sm:p-4 shadow-xl border border-white/5">
      {/* Fond subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <Moon className="w-4 h-4 text-purple-300" />
            </motion.div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                Calendrier Lunaire
              </h2>
              <p className="text-[10px] text-purple-300/60 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                <span>Phases cosmiques</span>
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-white/5 rounded-full px-2.5 py-1 border border-white/10">
            <Sparkles className="w-3 h-3 text-purple-300" />
            <span className="text-[10px] font-medium text-purple-200">Mystique</span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-lg p-1.5 border border-white/5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevMonth}
            disabled={loading}
            className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30"
            aria-label="Mois précédent"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-white" />
          </motion.button>
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-3"
          >
            <div className="text-lg sm:text-xl font-black text-white tracking-tight">
              {MONTH_NAMES[month - 1]}
            </div>
            <div className="text-[10px] text-purple-300/60 font-medium">
              {year}
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextMonth}
            disabled={loading}
            className="p-2 rounded bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30"
            aria-label="Mois suivant"
          >
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
});

Header.displayName = "Header";
