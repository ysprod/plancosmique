import { useState, useCallback, useEffect, useMemo } from 'react';
import { api } from '@/lib/api/client';

export type ReportType = 'overview' | 'consultations' | 'revenue' | 'users';
export type DateRangeType = '7' | '30' | '90' | '365';

export interface BackendStats {
  users: { total: number; active: number; new: number; inactive: number };
  consultations: { total: number; pending: number; completed: number; revenue: number };
  payments: { total: number; pending: number; completed: number; failed: number };
  activity: { todayUsers: number; todayConsultations: number; todayRevenue: number; growth: number };
}

export interface ReportMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  subLabel?: string;
}

export interface ChartDataPoint {
  name: string;
  consultations: number;
  revenue: number;
  users: number;
}

export function useAdminReports() {
  const [dateRange, setDateRange] = useState<DateRangeType>('30');
  const [selectedReport, setSelectedReport] = useState<ReportType>('overview');
  const [stats, setStats] = useState<BackendStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de chargement';
      setError(message);
      // eslint-disable-next-line no-console
      console.error('❌ Erreur fetch stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const metrics = useMemo<ReportMetric[]>(() => {
    if (!stats) return [];
    return [
      {
        label: 'Total Consultations',
        value: stats.consultations.total,
        change: stats.activity.growth,
        icon: null, // à injecter dans le composant
        color: 'from-blue-500 to-blue-600',
        subLabel: `${stats.consultations.completed} complétées`
      },
      {
        label: 'Revenus',
        value: `${stats.consultations.revenue.toLocaleString()}`,
        change: stats.activity.growth,
        icon: null,
        color: 'from-green-500 to-green-600',
        subLabel: `${stats.payments.completed} paiements`
      },
      {
        label: 'Utilisateurs Actifs',
        value: stats.users.active,
        change: stats.activity.growth,
        icon: null,
        color: 'from-purple-500 to-purple-600',
        subLabel: `${stats.users.total} au total`
      },
      {
        label: 'Croissance',
        value: `${stats.activity.growth.toFixed(1)}%`,
        change: stats.activity.growth,
        icon: null,
        color: 'from-orange-500 to-orange-600',
        subLabel: `${stats.activity.todayConsultations} aujourd'hui`
      },
    ];
  }, [stats]);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!stats) return [];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'];
    return months.map((month, index) => ({
      name: month,
      consultations: Math.floor(stats.consultations.total * (0.7 + Math.random() * 0.6)),
      revenue: Math.floor(stats.consultations.revenue * (0.7 + Math.random() * 0.6)),
      users: Math.floor(stats.users.active * (0.8 + Math.random() * 0.4))
    }));
  }, [stats]);

  const chartConfig = useMemo(() => {
    switch (selectedReport) {
      case 'consultations':
        return { dataKey: 'consultations', color: '#3b82f6', title: 'Consultations par Mois' };
      case 'revenue':
        return { dataKey: 'revenue', color: '#10b981', title: 'Revenus par Mois' };
      case 'users':
        return { dataKey: 'users', color: '#8b5cf6', title: 'Utilisateurs Actifs par Mois' };
      default:
        return { dataKey: 'all', color: '#3b82f6', title: 'Tendances Globales' };
    }
  }, [selectedReport]);

  return {
    dateRange,
    setDateRange,
    selectedReport,
    setSelectedReport,
    stats,
    loading,
    error,
    metrics,
    chartData,
    chartConfig,
    fetchStats,
  };
}
