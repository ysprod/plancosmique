'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, Users } from 'lucide-react';

type UsersStatsProps = {
  stats: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
    verified: number;
  };
};

const statsConfig: Array<{
  icon: any;
  label: string;
  key: keyof UsersStatsProps['stats'];
  color: string;
  span?: string;
}> = [
    { icon: Users, label: 'Total', key: 'total', color: 'blue' },
    { icon: CheckCircle, label: 'Actifs', key: 'active', color: 'green' },
    { icon: Clock, label: 'Inactifs', key: 'inactive', color: 'gray' },
    { icon: Shield, label: 'Admins', key: 'admins', color: 'purple' },
  ];

export default function UsersStats({ stats }: UsersStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4"
    >
      {statsConfig.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-white rounded-lg p-2.5 border border-gray-200 hover:shadow-md transition-all ${stat.span || ''}`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-1 bg-${stat.color}-50 rounded`}>
              <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stats[stat.key]}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}