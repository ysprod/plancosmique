import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const colorClassesMap: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-600',
  orange: 'bg-orange-100 text-orange-600',
  cyan: 'bg-cyan-100 text-cyan-600'
};

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  const colorClasses = colorClassesMap[color] || '';
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
      <div className={`w-10 h-10 rounded-lg ${colorClasses} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

export default StatCard;