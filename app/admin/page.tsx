'use client';
import { StatCard } from '@/components/admin/StatCard';
import { useAdminStats } from '@/hooks/useAdminStats';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle, Clock,
  CreditCard,
  DollarSign,
  FileText,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

export default function AdminDashboard() {
  const { stats, loading, error, refetch, lastUpdated } = useAdminStats();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Gestion du rafraîchissement avec animation
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  // Calcul des statistiques dérivées
  const derivedStats = useMemo(() => {
    if (!stats) return null;

    return {
      userGrowthRate: ((stats.users.new / stats.users.total) * 100).toFixed(1),
      consultationSuccessRate: ((stats.consultations.completed / stats.consultations.total) * 100).toFixed(1),
      paymentSuccessRate: ((stats.payments.completed / stats.payments.total) * 100).toFixed(1),
      averageRevenue: (stats.consultations.revenue / (stats.consultations.completed || 1)).toFixed(0),
      activeUserRate: ((stats.users.active / stats.users.total) * 100).toFixed(0),
    };
  }, [stats]);

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // État de chargement initial
  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-14 h-14 border-4 border-amber-500 border-t-transparent 
                       rounded-full mx-auto mb-4"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-base font-semibold text-gray-900 mb-1">
              Chargement du tableau de bord
            </p>
            <p className="text-sm text-gray-500">
              Veuillez patienter quelques instants...
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // État d'erreur
  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full bg-white rounded-2xl shadow-xl 
                     border border-gray-200 p-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
            }}
          >
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {error || 'Impossible de charger les statistiques'}
          </p>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white rounded-xl font-semibold hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-200
                       flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Chargement...' : 'Réessayer'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête compact et sticky */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Titre compact */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Tableau de bord
                </h1>
                {lastUpdated && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(lastUpdated).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                )}
              </div>
            </div>
            
            {/* Boutons d'action */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg 
                           font-semibold text-sm transition-all ${
                  isRefreshing || loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {isRefreshing ? 'Actualisation...' : 'Actualiser'}
                </span>
              </motion.button>

              <Link
                href="/admin/reports"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 
                           text-gray-700 hover:bg-gray-100 rounded-lg 
                           transition-colors border border-gray-200 text-sm font-medium"
              >
                <Target className="w-4 h-4" />
                Rapports
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        {/* Bannière de rafraîchissement */}
        <AnimatePresence>
          {(isRefreshing || loading) && stats && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white 
                         rounded-lg p-3 mb-4 flex items-center justify-center gap-2 
                         shadow-md"
            >
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">
                Actualisation des données en cours...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Section Activité du jour - Compacte */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 
                       rounded-xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden"
          >
            {/* Effet de fond animé */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-48 h-48 bg-white rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10">
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
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm 
                             rounded-full px-2.5 py-1"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold">LIVE</span>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { icon: Users, label: 'Utilisateurs', value: stats.activity.todayUsers, percent: ((stats.activity.todayUsers / stats.users.total) * 100).toFixed(1) },
                  { icon: FileText, label: 'Consultations', value: stats.activity.todayConsultations, percent: ((stats.activity.todayConsultations / stats.consultations.total) * 100).toFixed(1) },
                  { icon: DollarSign, label: 'Revenu', value: `${stats.activity.todayRevenue.toLocaleString()} F`, percent: derivedStats?.averageRevenue ? `Moy: ${derivedStats.averageRevenue} F` : '' },
                  { icon: Activity, label: 'Croissance', value: `${Math.abs(stats.activity.growth)}%`, percent: stats.activity.growth >= 0 ? 'Positive' : 'Négative', trend: stats.activity.growth },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/15 rounded-lg p-3 backdrop-blur-md 
                               border border-white/20 shadow-md"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <item.icon className="w-3.5 h-3.5 text-white/80" />
                      <p className="text-white/90 text-xs font-medium">{item.label}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
                      {item.trend !== undefined && (
                        item.trend >= 0 ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5" />
                        )
                      )}
                    </div>
                    <p className="text-white/70 text-xs mt-0.5">
                      {item.percent && (typeof item.percent === 'string' && item.percent.includes('Moy') 
                        ? item.percent 
                        : `+${item.percent}%`
                      )}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Statistiques principales - Grid compact */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <StatCard
              title="Total Utilisateurs"
              value={stats.users.total.toLocaleString()}
              icon={Users}
              color="blue"
              trend={{
                value: parseFloat(derivedStats?.userGrowthRate || '0'),
                isPositive: stats.users.new > 0
              }}
            />
            
            <StatCard
              title="Consultations"
              value={stats.consultations.total.toLocaleString()}
              icon={FileText}
              color="green"
              trend={{
                value: parseFloat(derivedStats?.consultationSuccessRate || '0'),
                isPositive: stats.consultations.completed > stats.consultations.pending
              }}
            />
            
            <StatCard
              title="Paiements Réussis"
              value={stats.payments.completed.toLocaleString()}
              icon={CreditCard}
              color="purple"
              trend={{
                value: parseFloat(derivedStats?.paymentSuccessRate || '0'),
                isPositive: stats.payments.completed > stats.payments.failed
              }}
            />
            
            <StatCard
              title="Revenu Total"
              value={`${stats.consultations.revenue.toLocaleString()} F`}
              icon={DollarSign}
              color="orange"
              trend={{
                value: 23.1,
                isPositive: true
              }}
            />
          </motion.div>

          {/* Cards détails - Version compacte */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {/* Card Utilisateurs */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md 
                         border border-gray-100 p-4 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Utilisateurs</h3>
                </div>
                <Link
                  href="/admin/users"
                  className="text-amber-600 hover:text-amber-700 text-xs font-semibold
                             hover:underline"
                >
                  Voir tout →
                </Link>
              </div>
              
              <div className="space-y-2.5">
                {[
                  { icon: CheckCircle, label: 'Actifs', value: stats.users.active, color: 'green' },
                  { icon: TrendingUp, label: 'Nouveaux', value: stats.users.new, color: 'blue' },
                  { icon: Clock, label: 'Inactifs', value: stats.users.inactive, color: 'gray' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 3 }}
                    className="flex items-center justify-between py-2 px-3 
                               rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <span className="text-gray-700 flex items-center gap-2 text-sm font-medium">
                      <div className={`p-1 bg-${item.color}-100 rounded`}>
                        <item.icon className={`w-3 h-3 text-${item.color}-600`} />
                      </div>
                      {item.label}
                    </span>
                    <span className="font-bold text-gray-900">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600">Taux d'activation</span>
                  <span className="font-semibold text-gray-900">
                    {derivedStats?.activeUserRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${derivedStats?.activeUserRate}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card Consultations */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md 
                         border border-gray-100 p-4 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-50 rounded-lg">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Consultations</h3>
                </div>
                <Link
                  href="/admin/consultations"
                  className="text-amber-600 hover:text-amber-700 text-xs font-semibold
                             hover:underline"
                >
                  Voir tout →
                </Link>
              </div>
              
              <div className="space-y-2.5">
                {[
                  { icon: Clock, label: 'En attente', value: stats.consultations.pending, color: 'orange' },
                  { icon: CheckCircle, label: 'Complétées', value: stats.consultations.completed, color: 'green' },
                  { icon: DollarSign, label: 'Revenu', value: `${stats.consultations.revenue.toLocaleString()} F`, color: 'amber' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 3 }}
                    className="flex items-center justify-between py-2 px-3 
                               rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <span className="text-gray-700 flex items-center gap-2 text-sm font-medium">
                      <div className={`p-1 bg-${item.color}-100 rounded`}>
                        <item.icon className={`w-3 h-3 text-${item.color}-600`} />
                      </div>
                      {item.label}
                    </span>
                    <span className="font-bold text-gray-900 text-sm">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600">Taux de complétion</span>
                  <span className="font-semibold text-gray-900">
                    {derivedStats?.consultationSuccessRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${derivedStats?.consultationSuccessRate}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card Paiements */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md 
                         border border-gray-100 p-4 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-50 rounded-lg">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Paiements</h3>
                </div>
                <Link
                  href="/admin/payments"
                  className="text-amber-600 hover:text-amber-700 text-xs font-semibold
                             hover:underline"
                >
                  Voir tout →
                </Link>
              </div>
              
              <div className="space-y-2.5">
                {[
                  { icon: Clock, label: 'En attente', value: stats.payments.pending, color: 'orange' },
                  { icon: CheckCircle, label: 'Réussis', value: stats.payments.completed, color: 'green' },
                  { icon: AlertCircle, label: 'Échoués', value: stats.payments.failed, color: 'red' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 3 }}
                    className="flex items-center justify-between py-2 px-3 
                               rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <span className="text-gray-700 flex items-center gap-2 text-sm font-medium">
                      <div className={`p-1 bg-${item.color}-100 rounded`}>
                        <item.icon className={`w-3 h-3 text-${item.color}-600`} />
                      </div>
                      {item.label}
                    </span>
                    <span className="font-bold text-gray-900">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600">Taux de succès</span>
                  <span className="font-semibold text-gray-900">
                    {derivedStats?.paymentSuccessRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${derivedStats?.paymentSuccessRate}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
