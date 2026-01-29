"use client";
import { Position } from "@/lib/interfaces";
import { AlertCircle, ChevronDown, ChevronUp, Star, TrendingUp } from "lucide-react";
import { memo, useCallback, useState } from "react";
import PositionCard from "./PositionCard";

const SkyChart = memo(({ carteDuCiel }: { carteDuCiel: Position[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  if (!carteDuCiel) {
    return (
      <section
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 
                 backdrop-blur-xl rounded-2xl border border-white/15 
                 p-5 shadow-xl"
      >
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-3" />
          <p className="text-white/60 text-sm">Carte du ciel non disponible</p>
        </div>
      </section>
    );
  }

  const mainPositions = carteDuCiel.slice(0, 6);
  const otherPositions = carteDuCiel.slice(6);

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20  
       backdrop-blur-xl rounded-2xl border border-white/15  p-4 sm:p-5 shadow-xl"
      >
        <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-indigo-400" />
          Carte du Ciel • Positions Planétaires
          <span className="ml-auto text-xs text-white/60 font-normal">
            {carteDuCiel.length} positions
          </span>
        </h2>

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
            {isExpanded && (
              <div
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
              </div>
            )}
          </>
        )}
      </section>
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