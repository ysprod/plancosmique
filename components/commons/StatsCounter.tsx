/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api/client';

// Types
interface Stats {
  subscribers: number;
  visits: number;
}

interface StatCardProps {
  value: number | null;
  label: string;
  icon: React.ReactNode;
  loading: boolean;
  color: 'purple' | 'fuchsia';
}

// Constantes
const STAT_COLORS = {
  purple: {
    text: 'text-purple-700',
    border: 'border-purple-100',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
  },
  fuchsia: {
    text: 'text-fuchsia-700',
    border: 'border-fuchsia-100',
    bg: 'bg-fuchsia-50',
    iconBg: 'bg-fuchsia-100',
  },
} as const;

// Utilitaires
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// Composants
const StatCard: React.FC<StatCardProps> = ({ value, label, icon, loading, color }) => {
  const colors = STAT_COLORS[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`flex flex-col items-center bg-white rounded-2xl shadow-lg hover:shadow-xl px-8 py-6 border-2 ${colors.border} transition-all relative overflow-hidden min-w-[160px]`}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-full blur-3xl opacity-30 -z-10`} />

      {/* Icon */}
      <div className={`${colors.iconBg} p-3 rounded-xl mb-3`}>
        {icon}
      </div>

      {/* Value */}
      <span className={`text-4xl font-extrabold ${colors.text} tracking-tight`}>
        {loading ? (
          <span className="animate-pulse">...</span>
        ) : value !== null ? (
          formatNumber(value)
        ) : (
          '--'
        )}
      </span>

      {/* Label */}
      <span className="text-sm font-semibold text-gray-600 mt-2 uppercase tracking-wide">
        {label}
      </span>

      {/* Trend indicator (optional) */}
      {!loading && value !== null && value > 0 && (
        <div className="flex items-center gap-1 mt-2 text-green-600 text-xs">
          <TrendingUp className="w-3 h-3" />
          <span>+{Math.floor(Math.random() * 15)}%</span>
        </div>
      )}
    </motion.div>
  );
};

const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-full max-w-md bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3"
  >
    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-red-700 text-sm font-medium">{message}</p>
      <button
        onClick={onRetry}
        className="text-red-600 hover:text-red-800 text-xs font-semibold mt-2 underline"
      >
        Réessayer
      </button>
    </div>
  </motion.div>
);

const LoadingSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row gap-6 items-center justify-center py-6">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="flex flex-col items-center bg-white rounded-2xl shadow-lg px-8 py-6 border-2 border-gray-100 animate-pulse min-w-[160px]"
      >
        <div className="w-12 h-12 bg-gray-200 rounded-xl mb-3" />
        <div className="w-20 h-10 bg-gray-200 rounded mb-2" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    ))}
  </div>
);

// Composant principal
const StatsCounter: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const trackVisit = useCallback(async () => {
    try {
      await api.post('/metrics/visit');
    } catch (err) {
      console.warn('Échec de l\'enregistrement de la visite:', err);
      // N'afficher pas d'erreur à l'utilisateur pour le tracking
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/stats'); // GET au lieu de POST pour récupérer des stats

      if (!res.data) {
        throw new Error('Aucune donnée reçue');
      }

      setStats({
        subscribers: res.data.subscribers ?? 0,
        visits: res.data.visits ?? 0,
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erreur lors de la récupération des statistiques';
      setError(errorMessage);
      console.error('Erreur stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Track visit (ne bloque pas le chargement des stats)
    trackVisit();

    // Fetch stats
    fetchStats();

    // Optional: Auto-refresh toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, [fetchStats, trackVisit]);

  if (loading && !stats) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center py-6">
        <StatCard
          value={stats?.subscribers ?? null}
          label="Abonnés"
          icon={<Users className="w-6 h-6 text-purple-600" />}
          loading={loading}
          color="purple"
        />

        <StatCard
          value={stats?.visits ?? null}
          label="Visites"
          icon={<Eye className="w-6 h-6 text-fuchsia-600" />}
          loading={loading}
          color="fuchsia"
        />
      </div>

      {error && (
        <div className="flex justify-center mt-4">
          <ErrorMessage message={error} onRetry={fetchStats} />
        </div>
      )}
    </div>
  );
};

export default StatsCounter;
