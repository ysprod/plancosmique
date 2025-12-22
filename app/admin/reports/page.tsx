'use client';
import { api } from '@/lib/api/client';
import { BarChart3, DollarSign, Download, Filter, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ReportMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface ReportData {
  month: string;
  consultations: number;
  revenue: number;
  users: number;
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30');
  const [selectedReport, setSelectedReport] = useState<'overview' | 'consultations' | 'revenue' | 'users'>('overview');
  const [metrics, setMetrics] = useState<ReportMetric[]>([]);
  const [chartData, setChartData] = useState<ReportData[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les stats générales
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/stats');
        const data = response.data;
        
        // Transformer les données en métriques
        const newMetrics: ReportMetric[] = [
          {
            label: 'Total Consultations',
            value: data.consultations?.total || 0,
            change: 12.5,
            icon: <BarChart3 className="w-6 h-6" />,
            color: 'from-blue-500 to-blue-600',
          },
          {
            label: 'Revenus',
            value: `€${(data.consultations?.revenue || 0).toLocaleString()}`,
            change: 8.2,
            icon: <DollarSign className="w-6 h-6" />,
            color: 'from-green-500 to-green-600',
          },
          {
            label: 'Utilisateurs Actifs',
            value: data.users?.active || 0,
            change: 5.1,
            icon: <Users className="w-6 h-6" />,
            color: 'from-purple-500 to-purple-600',
          },
          {
            label: 'Taux de Croissance',
            value: `${(data.activity?.growth || 0).toFixed(1)}%`,
            change: 3.4,
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'from-orange-500 to-orange-600',
          },
        ];

        setMetrics(newMetrics);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        console.error('Erreur fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dateRange]);

  // Récupérer les données mensuelles
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await api.get(`/admin/stats?range=${dateRange}`);
        const data = response.data;
        
        // Transformer les données pour le graphique
        const mockChartData: ReportData[] = [
          { month: 'Jan', consultations: 240, revenue: 2400, users: 240 },
          { month: 'Fév', consultations: 290, revenue: 2900, users: 290 },
          { month: 'Mar', consultations: 200, revenue: 2000, users: 200 },
          { month: 'Avr', consultations: 279, revenue: 2790, users: 279 },
          { month: 'Mai', consultations: 200, revenue: 2000, users: 200 },
          { month: 'Juin', consultations: 210, revenue: 2100, users: 210 },
        ];

        setChartData(mockChartData);
      } catch (err) {
        console.error('Erreur fetch chart data:', err);
      }
    };

    fetchChartData();
  }, [dateRange]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement des rapports...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4">Erreur: {error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Rapports</h1>
          <p className="text-slate-500 dark:text-slate-400">Analyses et statistiques de votre plateforme</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filtrer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex gap-2">
        {['7', '30', '90', '365'].map((range) => (
          <button
            key={range}
            onClick={() => setDateRange(range)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              dateRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {range === '7' && '7 jours'}
            {range === '30' && '30 jours'}
            {range === '90' && '90 jours'}
            {range === '365' && 'Année'}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{metric.value}</p>
                <p className={`text-sm font-medium mt-2 ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}% ce mois
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} text-white`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-1">
          {(['overview', 'consultations', 'revenue', 'users'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedReport(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedReport === tab
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              {tab === 'overview' && 'Aperçu'}
              {tab === 'consultations' && 'Consultations'}
              {tab === 'revenue' && 'Revenus'}
              {tab === 'users' && 'Utilisateurs'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {selectedReport === 'overview' && 'Tendances Globales'}
          {selectedReport === 'consultations' && 'Consultations par Mois'}
          {selectedReport === 'revenue' && 'Revenus par Mois'}
          {selectedReport === 'users' && 'Utilisateurs Actifs'}
        </h2>
        
        <div className="h-80 flex items-end justify-between gap-2 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-800 p-4 rounded-lg">
          {chartData.map((data, index) => {
            let value = data.consultations;
            if (selectedReport === 'revenue') value = data.revenue / 100;
            if (selectedReport === 'users') value = data.users;
            
            const maxValue = Math.max(...chartData.map(d => {
              if (selectedReport === 'revenue') return d.revenue / 100;
              if (selectedReport === 'users') return d.users;
              return d.consultations;
            }));
            
            const heightPercent = (value / maxValue) * 100;

            return (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500" style={{ height: `${heightPercent}%` }} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Activité Récente</h2>
        <div className="space-y-4">
          {[
            { type: 'consultation', user: 'Marie Dupont', action: 'Consultation Tarot complétée', time: 'il y a 2h' },
            { type: 'payment', user: 'Jean Martin', action: 'Paiement reçu (45€)', time: 'il y a 4h' },
            { type: 'registration', user: 'Sophie Bernard', action: 'Nouvel utilisateur inscrit', time: 'il y a 6h' },
            { type: 'consultation', user: 'Pierre Durand', action: 'Consultation Astrologie', time: 'il y a 8h' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'consultation' ? 'bg-blue-500' : activity.type === 'payment' ? 'bg-green-500' : 'bg-purple-500'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.user}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activity.action}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
