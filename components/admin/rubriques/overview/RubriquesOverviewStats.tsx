import StatCard from '@/components/admin/rubriques/overview/StatCard';
import { motion } from 'framer-motion';
import { Book, Calendar, Star, TrendingUp } from 'lucide-react';

export function RubriquesOverviewStats({ stats }: { stats: any }) {
  if (!stats) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
    >
      <StatCard icon={<Book />} label="Domaines" value={stats.totalDomaines} color="purple" />
      <StatCard icon={<Star />} label="Rubriques" value={stats.totalRubriques} color="blue" />
      <StatCard icon={<Calendar />} label="Consultations" value={stats.totalConsultations} color="fuchsia" />
      <StatCard icon={<TrendingUp />} label="Cycliques" value={stats.consultationsCycliques} color="cyan" />
    </motion.div>
  );
}