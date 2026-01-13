"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {  Info,  X} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { DayCard } from "./DayCard";
import { Header } from "./Header";
import { getAdvice, getPhaseConfig, normalizeIllumination, useThrottle } from "./moonPhaseUtils";
import { containerVariants, modalVariants } from "./moonPhaseVariants";

const LEGEND_ITEMS = [
  { emoji: "🌑", label: "Nouvelle Lune" },
  { emoji: "🌓", label: "Premier Quartier" },
  { emoji: "🌕", label: "Pleine Lune" },
  { emoji: "🌗", label: "Dernier Quartier" },
];

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
      className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${phaseConfig.badge} flex items-center justify-center shadow-lg`}
            >
              <span className="text-2xl">{phaseConfig.emoji}</span>
            </motion.div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                Jour {day.day}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Phase Lunaire</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>

        <div className="flex justify-center mb-5">
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0.7, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full"
              dangerouslySetInnerHTML={{ __html: day.svg }}
            />
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-3 border border-purple-100 dark:border-purple-800/30"
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Phase</span>
              <span className="text-sm font-black text-gray-900 dark:text-white">{day.phaseName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Illumination</span>
              <span className="text-sm font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{day.illumination}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between text-[10px] text-gray-600 dark:text-gray-400 mb-1.5 px-1">
              <span>🌑 Nouvelle</span>
              <span>Pleine 🌕</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${day.illumination}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${phaseConfig.badge} rounded-full relative`}
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-3 border border-indigo-200 dark:border-indigo-800/30"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">Conseil énergétique</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {advice}
            </p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className={`w-full mt-4 py-3 bg-gradient-to-r ${phaseConfig.badge} text-white rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all relative overflow-hidden`}
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <span className="relative">Compris</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
});
DetailModal.displayName = "DetailModal";


export function MoonPhaseWidget() {
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<MoonPhaseDay | null>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const prefersReducedMotion = useReducedMotion();


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
        className="grid grid-cols-1 sm:grid-cols-7 px-4 py-4 gap-1.5"
      >
        {moonDays.map((day) => (
          <DayCard
            key={`${day.day}-${day.illumination}`}
            day={day}
            onClick={() => handleDayClick(day)}
          />
        ))}
      </motion.div>

      {/* Légende et explication des phases lunaires */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap gap-2 justify-center pt-2 px-2">
          {LEGEND_ITEMS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <span className="text-base sm:text-lg">{item.emoji}</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Explication des phases lunaires */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div className="text-center mb-3">
            <h4 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Comprendre les phases lunaires
            </h4>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-3 border border-purple-100 dark:border-purple-800/30">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-lg shrink-0">🌑</span>
                  <span><b className="text-gray-900 dark:text-white">Nouvelle Lune</b> : début du cycle, la Lune est invisible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg shrink-0">🌓</span>
                  <span><b className="text-gray-900 dark:text-white">Premier quartier</b> : la Lune est à moitié éclairée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg shrink-0">🌕</span>
                  <span><b className="text-gray-900 dark:text-white">Pleine Lune</b> : la Lune est entièrement éclairée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg shrink-0">🌗</span>
                  <span><b className="text-gray-900 dark:text-white">Dernier quartier</b> : la Lune est à moitié éclairée (côté opposé)</span>
                </li>
              </ul>
              <div className="mt-3 text-center text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400">
                ✨ Cycle complet : environ 29,5 jours
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800/30">
              <h5 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Durée approximative de chaque phase :</h5>
              <ul className="space-y-1.5 text-xs sm:text-sm">
                <li className="flex justify-between items-center">
                  <span>🌑 <b className="text-gray-900 dark:text-white">Nouvelle Lune</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1-2 jours</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌒 <b className="text-gray-900 dark:text-white">Lune croissante</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌓 <b className="text-gray-900 dark:text-white">Premier quartier</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1 jour</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌔 <b className="text-gray-900 dark:text-white">Gibbeuse croissante</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌕 <b className="text-gray-900 dark:text-white">Pleine Lune</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1 jour</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌖 <b className="text-gray-900 dark:text-white">Gibbeuse décroissante</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌗 <b className="text-gray-900 dark:text-white">Dernier quartier</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1 jour</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌘 <b className="text-gray-900 dark:text-white">Lune décroissante</b></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
                </li>
              </ul>
              <div className="mt-3 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic text-center">
                💡 Les durées sont approximatives et peuvent varier légèrement
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedDay && <DetailModal day={selectedDay} onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
}
