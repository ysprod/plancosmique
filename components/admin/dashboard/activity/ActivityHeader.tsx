"use client";
import { Zap } from "lucide-react";
import { memo } from "react";
import LiveBadge from "./LiveBadge";

const ActivityHeader = memo(() => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
        <Zap className="w-4 h-4" />
      </div>
      <div>
        <h2 className="text-base sm:text-lg font-bold">Activité du jour</h2>
        <p className="text-white/80 text-xs">Statistiques en temps réel</p>
      </div>
    </div>
    <LiveBadge />
  </div>
));

ActivityHeader.displayName = "ActivityHeader";

export default ActivityHeader;