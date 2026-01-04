import React from "react";
import OffrandesStats from "./OffrandesStats";

interface Category {
  value: string;
  label: string;
  emoji: string;
  color: string;
}

interface OffrandesStatsPanelProps {
  statsData: any;
}

const OffrandesStatsPanel: React.FC<OffrandesStatsPanelProps> = ({ statsData }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
      <span className="w-5 h-5 text-violet-500">🛍️</span> Statistiques des ventes d'offrandes
    </h2>
    {statsData && (
      <OffrandesStats statsData={statsData} />
    )}
  </div>
);

export default OffrandesStatsPanel;
