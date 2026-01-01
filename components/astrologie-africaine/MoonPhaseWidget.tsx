"use client";

import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Moon,
  Info,
  Zap,
  X
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface MoonPhaseDay {
  day: number;
  phaseName: string;
  svg: string;
  illumination: number;
  isNew: boolean;
  isFull: boolean;
  isToday: boolean;
}

interface MonthData {
  year: number;
  month: number;
  phases: Record<number, any>;
}

// ============================================================================
// CONFIGURATION OPTIMISÉE
// ============================================================================

const PHASE_CONFIG = {
  nouvelle: { 
    badge: "from-indigo-500 to-purple-600",
    ring: "ring-indigo-500/30",
    emoji: "🌑"
  },
  pleine: { 
    badge: "from-amber-400 to-yellow-500",
    ring: "ring-amber-500/30",
    emoji: "🌕"
  },
  croissant: { 
    badge: "from-blue-400 to-cyan-500",
    ring: "ring-blue-500/30",
    emoji: "🌒"
  },
  décroissant: { 
    badge: "from-purple-400 to-pink-500",
    ring: "ring-purple-500/30",
    emoji: "🌘"
  },
  default: { 
    badge: "from-gray-400 to-gray-600",
    ring: "ring-gray-500/30",
    emoji: "🌓"
  }
} as const;

const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
] as const;

const LEGEND_ITEMS = [
  { label: "Nouvelle", emoji: "🌑" },
  { label: "Pleine", emoji: "🌕" },
  { label: "Aujourd'hui", emoji: "⭐" }
] as const;

// ============================================================================
// UTILITAIRES
// ============================================================================

const getPhaseConfig = (phaseName: string) => {
  const phase = phaseName.toLowerCase();
  for (const [key, config] of Object.entries(PHASE_CONFIG)) {
    if (phase.includes(key)) return config;
  }
  return PHASE_CONFIG.default;
};

const getAdvice = (illumination: number) => {
  if (illumination < 25) return "Période d'introspection. Temps idéal pour planifier et méditer.";
  if (illumination < 75) return "Énergie croissante. Poussez vos projets vers l'avant.";
  return "Culmination énergétique. Récoltez les fruits de vos efforts.";
};

const normalizeIllumination = (value: any): number => {
  const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  if (isNaN(num) || !isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
};

// ============================================================================
// VARIANTS D'ANIMATION
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.01 }
  }
};

const dayVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 35 }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: { duration: 0.12 }
  }
};

// ============================================================================
// HOOK THROTTLE
// ============================================================================

const useThrottle = <T extends any[]>(callback: (...args: T) => void, delay: number) => {
  const lastCall = useRef(0);
  
  return useCallback((...args: T) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};

// ============================================================================
// COMPOSANTS MÉMOÏSÉS
// ============================================================================

interface HeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  loading: boolean;
}

const Header = memo<HeaderProps>(({ year, month, onPrevMonth, onNextMonth, loading }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-purple-900/70 to-slate-950 p-3 sm:p-4 shadow-xl border border-white/5">
      {/* Fond subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
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

interface DayCardProps {
  day: MoonPhaseDay;
  onClick: () => void;
}

const DayCard = memo<DayCardProps>(({ day, onClick }) => {
  const phaseConfig = useMemo(() => getPhaseConfig(day.phaseName), [day.phaseName]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      variants={dayVariants}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative p-2 rounded-lg
        ${day.isToday 
          ? 'bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border-2 border-yellow-400/50 shadow-md' 
          : 'bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
        }
        ${!day.isToday && 'border border-gray-200 hover:border-purple-300'}
        transition-all shadow-sm hover:shadow
         
        aspect-square mb-16
      `}
    >
      {/* Numéro */}
      <div className={`text-[11px] font-bold ${day.isToday ? 'text-yellow-600' : 'text-gray-900'}`}>
        {day.day}
      </div>

      {/* SVG Lune */}
      <div 
        dangerouslySetInnerHTML={{ __html: day.svg }}
        className="w-7 h-7 sm:w-8 sm:h-8"
      />

      {/* Badge phase spéciale */}
      {(day.isNew || day.isFull) && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${phaseConfig.badge} flex items-center justify-center shadow-md border border-white/40`}
        >
          <span className="text-[10px]">{phaseConfig.emoji}</span>
        </motion.div>
      )}

      {/* Badge aujourd'hui */}
      {day.isToday && (
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -left-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md"
        >
          Auj
        </motion.div>
      )}
    </motion.button>
  );
});
DayCard.displayName = "DayCard";

interface DetailModalProps {
  day: MoonPhaseDay | null;
  onClose: () => void;
}

const DetailModal = memo<DetailModalProps>(({ day, onClose }) => {
  const prefersReducedMotion = useReducedMotion();

  if (!day) return null;

  const phaseConfig = getPhaseConfig(day.phaseName);
  const advice = getAdvice(day.illumination);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-4 sm:p-5 max-w-sm w-full shadow-2xl"
      >
        {/* Header compact */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${phaseConfig.badge} flex items-center justify-center shadow-lg`}>
              <span className="text-xl">{phaseConfig.emoji}</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">
                Jour {day.day}
              </h3>
              <p className="text-xs text-gray-500">Phase Lunaire</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>

        {/* SVG */}
        <div className="flex justify-center mb-5">
          <motion.span
            initial={prefersReducedMotion ? {} : { scale: 0.7, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            dangerouslySetInnerHTML={{ __html: day.svg }}
            className="w-28 h-28"
          />
        </div>

        {/* Infos compactes */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-gray-700">Phase</span>
              <span className="text-sm font-black text-gray-900">{day.phaseName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">Illumination</span>
              <span className="text-sm font-black text-gray-900">{day.illumination}%</span>
            </div>
          </div>

          {/* Barre de progression */}
          <div>
            <div className="flex justify-between text-[10px] text-gray-600 mb-1.5">
              <span>🌑 Nouvelle</span>
              <span>Pleine 🌕</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${day.illumination}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${phaseConfig.badge} rounded-full`}
              />
            </div>
          </div>

          {/* Conseil */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-bold text-gray-900 text-xs">Conseil énergétique</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              {advice}
            </p>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onClose}
          className={`w-full mt-4 py-2.5 bg-gradient-to-r ${phaseConfig.badge} text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all`}
        >
          Compris
        </motion.button>
      </motion.div>
    </motion.div>
  );
});
DetailModal.displayName = "DetailModal";

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export function MoonPhaseWidget() {
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<MoonPhaseDay | null>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const prefersReducedMotion = useReducedMotion();

  // ─────────────────────────────────────────────────────────────────────────
  // CALLBACKS
  // ─────────────────────────────────────────────────────────────────────────
  const fetchMonthData = useCallback(async (date: Date) => {
    setLoading(true);
    setError(null);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const cacheKey = `moon-${year}-${month}`;
    
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setMonthData(JSON.parse(cached));
        setLoading(false);
        return;
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }

    try {
      const url = `https://www.icalendar37.net/lunar/api/?lang=fr&year=${year}&month=${month}&LDZ=${Date.now()}`;
      const res = await fetch(url);
      const data = await res.json();
      
      const processedData = { year, month, phases: data.phase };
      setMonthData(processedData);
      sessionStorage.setItem(cacheKey, JSON.stringify(processedData));
    } catch {
      setError("Impossible de charger les phases lunaires.");
    } finally {
      setLoading(false);
    }
  }, []);

  const throttledFetch = useThrottle(fetchMonthData, 250);

  const handleMonthChange = useCallback((direction: -1 | 1) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  }, []);

  const handleDayClick = useCallback((day: MoonPhaseDay) => {
    setSelectedDay(day);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedDay(null);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // EFFECTS
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    throttledFetch(currentDate);
  }, [currentDate, throttledFetch]);

  // ─────────────────────────────────────────────────────────────────────────
  // MEMO
  // ─────────────────────────────────────────────────────────────────────────
  const moonDays = useMemo(() => {
    if (!monthData?.phases) return [];

    const today = new Date();
    const isCurrentMonth = 
      monthData.year === today.getFullYear() && 
      monthData.month === today.getMonth() + 1;

    return Object.entries(monthData.phases)
      .slice(0, 31)
      .map(([day, data]) => {
        if (!data || typeof data !== 'object') return null;

        const dayNum = parseInt(day);
        const phaseName = String(data.phaseName || '').toLowerCase();
        const illumination = normalizeIllumination(data.illumination);

        return {
          day: dayNum,
          phaseName: data.phaseName || 'Phase inconnue',
          svg: data.svg || '',
          illumination,
          isNew: phaseName.includes("nouvelle lune"),
          isFull: phaseName.includes("pleine lune"),
          isToday: isCurrentMonth && dayNum === today.getDate()
        };
      })
      .filter((day): day is MoonPhaseDay => day !== null);
  }, [monthData]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  if (loading && !monthData) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-3 border-transparent border-t-purple-500 border-r-purple-400 rounded-full"
          />
          <Moon className="absolute inset-0 m-auto w-5 h-5 text-purple-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
        <p className="text-sm text-red-600 font-semibold mb-2">{error}</p>
        <button 
          onClick={() => fetchMonthData(currentDate)}
          className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={`${currentDate.getMonth()}-${currentDate.getFullYear()}`}
        className="grid grid-cols-7 gap-1.5"
      >
        {moonDays.map((day) => (
          <DayCard
            key={`${day.day}-${day.illumination}`}
            day={day}
            onClick={() => handleDayClick(day)}
          />
        ))}
      </motion.div>

      <div className="flex flex-wrap gap-1.5 justify-center pt-1">
        {LEGEND_ITEMS.map((item) => (
          <motion.div
            key={item.label}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1 shadow-sm border border-gray-200"
          >
            <span className="text-xs">{item.emoji}</span>
            <span className="text-[10px] font-medium text-gray-700">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedDay && <DetailModal day={selectedDay} onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
}
