"use client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ChevronDown, ChevronUp, Star, TrendingUp } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { CarteDuCiel } from "@/lib/types/carteduciel";
import { CarteDuCielBase, Position } from "@/lib/interfaces";
import PositionCard from "./PositionCard";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  })
};

const SkyChart = memo(({ carteDuCiel }: { carteDuCiel?: CarteDuCiel | CarteDuCielBase }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  if (!carteDuCiel) {
    return (
      <motion.section
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 
                 backdrop-blur-xl rounded-2xl border border-white/15 
                 p-5 shadow-xl"
      >
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-3" />
          <p className="text-white/60 text-sm">Carte du ciel non disponible</p>
        </div>
      </motion.section>
    );
  }

  let positions: Position[] = [];
  if ('carteDuCiel' in (carteDuCiel ?? {})) {
    positions = (carteDuCiel as CarteDuCiel).carteDuCiel.positions || [];
  } else if (carteDuCiel && 'positions' in carteDuCiel) {
    positions = (carteDuCiel as CarteDuCielBase).positions || [];
  }
  const mainPositions = positions.slice(0, 6);
  const otherPositions = positions.slice(6);

  return (
    <>
      <motion.section
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 
                 backdrop-blur-xl rounded-2xl border border-white/15 
                 p-4 sm:p-5 shadow-xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base sm:text-lg font-bold text-white mb-4 
                   flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-5 h-5 text-indigo-400" />
          </motion.div>
          Carte du Ciel • Positions Planétaires
          <span className="ml-auto text-xs text-white/60 font-normal">
            {positions.length} positions
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {mainPositions.map((position, index) => (
            <PositionCard key={index} position={position} index={index} />
          ))}
        </div>
        {otherPositions.length > 0 && (
          <>
            <button
              onClick={toggleExpanded}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       bg-white/5 border border-white/10 hover:bg-white/10
                       text-white text-xs font-semibold transition-all"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {isExpanded ? 'Masquer' : `Voir ${otherPositions.length} positions supplémentaires`}
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {otherPositions.map((position, index) => (
                      <PositionCard
                        key={index + mainPositions.length}
                        position={position}
                        index={index + mainPositions.length}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.section>

      <div className="mt-4 text-center text-xs text-white/60">
        <span>
          Votre carte du ciel a été réalisée en utilisant les Éphémérides de la NASA (Swiss Ephemeris)
        </span>
      </div>
    </>
  );
});

SkyChart.displayName = 'SkyChart';

export default SkyChart;