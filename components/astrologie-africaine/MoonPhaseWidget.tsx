"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Info,
  X
} from "lucide-react";
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

// ============================================================================

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
      <div>
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

        {/* Explication des phases lunaires */}
        <div className="mt-4 text-xs text-center text-gray-700 bg-white/70 rounded-lg p-3 max-w-xl mx-auto">
          <strong>Voici les phases lunaires :</strong><br />
          <ul className="list-disc list-inside text-left mt-1 mb-2">
            <li><b>Nouvelle Lune</b> 🌑 : début du cycle, la Lune est invisible</li>
            <li><b>Premier quartier</b> 🌓 : la Lune est à moitié éclairée</li>
            <li><b>Pleine Lune</b> 🌕 : la Lune est entièrement éclairée</li>
            <li><b>Dernier quartier</b> 🌗 : la Lune est à moitié éclairée (côté opposé)</li>
          </ul>
          <span className="block mt-1">Cycle complet : environ 29,5 jours 😊</span>

          <div className="mt-3 text-left">
            <strong>Durée approximative de chaque phase :</strong>
            <ul className="list-disc list-inside mt-1 mb-2">
              <li><b>Nouvelle Lune</b> 🌑 : 1-2 jours</li>
              <li><b>Lune croissante</b> : 7,4 jours (jusqu'au Premier quartier)</li>
              <li><b>Premier quartier</b> 🌓 : 1 jour</li>
              <li><b>Lune gibbeuse croissante</b> : 7,4 jours (jusqu'à la Pleine Lune)</li>
              <li><b>Pleine Lune</b> 🌕 : 1 jour</li>
              <li><b>Lune gibbeuse décroissante</b> : 7,4 jours (jusqu'au Dernier quartier)</li>
              <li><b>Dernier quartier</b> 🌗 : 1 jour</li>
              <li><b>Lune décroissante</b> : 7,4 jours (jusqu'à la Nouvelle Lune suivante)</li>
            </ul>
            <span className="block text-xs text-gray-500 mt-1">Note : les durées sont approximatives et peuvent varier légèrement. 😊</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDay && <DetailModal day={selectedDay} onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
}
