'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Zap,
  BarChart3,
} from 'lucide-react';

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  trend?: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'consultation' | 'payment';
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simuler le chargement des données
      // En production, ces données viendront de votre API backend
      setStats([
        {
          label: 'Utilisateurs totaux',
          value: 1248,
          icon: Users,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20',
          trend: 12,
        },
        {
          label: 'Consultations',
          value: 3645,
          icon: FileText,
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20',
          trend: 23,
        },
        {
          label: 'Revenus (ce mois)',
          value: '245,680 FCFA',
          icon: TrendingUp,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          trend: 18,
        },
        {
          label: 'Consultations en attente',
          value: 47,
          icon: Clock,
          color: 'text-orange-400',
          bgColor: 'bg-orange-500/20',
          trend: -5,
        },
      ]);

      setActivities([
        {
          id: '1',
          type: 'user',
          description: 'Nouvel utilisateur inscrit: Jean Dupont',
          timestamp: 'Il y a 5 minutes',
          status: 'success',
        },
        {
          id: '2',
          type: 'consultation',
          description: 'Consultation astro complétée pour Marie Martin',
          timestamp: 'Il y a 15 minutes',
          status: 'success',
        },
        {
          id: '3',
          type: 'payment',
          description: 'Paiement reçu: 50,000 FCFA',
          timestamp: 'Il y a 1 heure',
          status: 'success',
        },
        {
          id: '4',
          type: 'consultation',
          description: 'Consultation en cours: Analyse de compatibilité',
          timestamp: 'Il y a 2 heures',
          status: 'pending',
        },
        {
          id: '5',
          type: 'user',
          description: 'Erreur de connexion détectée',
          timestamp: 'Il y a 3 heures',
          status: 'failed',
        },
      ]);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-400" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Bienvenue au Dashboard Admin
          </h1>
          <p className="text-slate-300">
            Gérez votre plateforme Mon Étoile en temps réel
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`${stat.bgColor} border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className={`${stat.color} w-8 h-8`} />
                {stat.trend && (
                  <div
                    className={`text-sm font-bold ${
                      stat.trend > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                  </div>
                )}
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <Eye className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Activité récente</h2>
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <div className="pt-1">{getStatusIcon(activity.status)}</div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.description}</p>
                  <p className="text-slate-400 text-xs mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Actions rapides
            </h2>

            <div className="space-y-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Gérer utilisateurs
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Voir consultations
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Générer rapport
              </button>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Paramètres système
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">État du système</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">API Backend</span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Base de données</span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Services externes</span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Stockage</span>
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Vue d'ensemble mensuelle</h2>
        </div>

        <div className="h-64 flex items-center justify-center bg-slate-800/50 rounded-lg">
          <div className="text-center">
            <p className="text-slate-400 mb-2">
              Graphiques détaillés à venir
            </p>
            <p className="text-slate-500 text-sm">
              Intégration d'une librairie de charts en cours
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
