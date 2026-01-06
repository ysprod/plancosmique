import { CATEGORIES_OFFRANDES } from '@/lib/constants';
import React from 'react';

interface StatsData {
  byCategory: Array<{ category: string; revenue: number; quantitySold: number }>;
  periods: {
    today: { revenue: number; quantitySold: number };
    last7: { revenue: number; quantitySold: number };
    last30: { revenue: number; quantitySold: number };
  };
  byOffering: Array<{
    offeringId: string;
    name: string;
    icon: string;
    category: string;
    revenue: number;
    quantitySold: number;
    avgUnitPrice: number;
  }>;
}

interface OffrandesStatsProps {
  statsData: StatsData;
}

const OffrandesStats: React.FC<OffrandesStatsProps> = ({ statsData}) => {
  if (!statsData) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {/* Par catégorie */}
      <div className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-950 rounded-2xl p-6 flex flex-col gap-2 shadow">
        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">Par catégorie</div>
        <div className="flex flex-col gap-1">
          {statsData.byCategory.map((cat) => (
            <div key={cat.category || 'autre'} className="flex items-center justify-between">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {cat.category ? (CATEGORIES_OFFRANDES.find(c => c.value === cat.category)?.label || cat.category) : 'Autre'}
              </span>
              <span className="font-black text-md text-emerald-700 dark:text-emerald-300">{cat.revenue.toLocaleString()} F</span>
              <span className="text-xs text-gray-500 ml-2">({cat.quantitySold})</span>
            </div>
          ))}
        </div>
      </div>
      {/* Par période */}
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-950 rounded-2xl p-6 flex flex-col gap-2 shadow">
        <div className="text-xs font-bold text-pink-700 dark:text-pink-300 mb-1">Par période</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Aujourd'hui</span>
            <span className="font-black text-md text-pink-700 dark:text-pink-300">{statsData.periods.today.revenue.toLocaleString()} F</span>
            <span className="text-xs text-gray-500 ml-2">({statsData.periods.today.quantitySold})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-200">7 derniers jours</span>
            <span className="font-black text-md text-pink-700 dark:text-pink-300">{statsData.periods.last7.revenue.toLocaleString()} F</span>
            <span className="text-xs text-gray-500 ml-2">({statsData.periods.last7.quantitySold})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-200">30 derniers jours</span>
            <span className="font-black text-md text-pink-700 dark:text-pink-300">{statsData.periods.last30.revenue.toLocaleString()} F</span>
            <span className="text-xs text-gray-500 ml-2">({statsData.periods.last30.quantitySold})</span>
          </div>
        </div>
      </div>
      {/* Par offrande */}
      <div className="overflow-x-auto col-span-full">
        <table className="min-w-[400px] w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left font-bold">Offrande</th>
              <th className="px-3 py-2 text-left font-bold">Catégorie</th>
              <th className="px-3 py-2 text-left font-bold">Quantité</th>
              <th className="px-3 py-2 text-left font-bold">CA (F)</th>
              <th className="px-3 py-2 text-left font-bold">Prix unitaire (moyen)</th>
            </tr>
          </thead>
          <tbody>
            {statsData.byOffering.map((o) => (
              <tr key={o.offeringId} className="border-b last:border-b-0">
                <td className="px-3 py-2 font-mono flex items-center gap-2">
                  <span className="text-lg">{o.icon}</span>
                  {o.name || <span className="italic text-gray-400">(inconnu)</span>}
                </td>
                <td className="px-3 py-2">{o.category ? (CATEGORIES_OFFRANDES.find(c => c.value === o.category)?.label || o.category) : '-'}</td>
                <td className="px-3 py-2">{o.quantitySold}</td>
                <td className="px-3 py-2">{o.revenue.toLocaleString()}</td>
                <td className="px-3 py-2">{o.avgUnitPrice ? o.avgUnitPrice.toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OffrandesStats;
