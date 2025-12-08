'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, CreditCard, TrendingUp, 
  AlertCircle, CheckCircle, Clock, DollarSign,
  Activity, ArrowUpRight, ArrowDownRight, RefreshCw,
  Sparkles, Calendar, BarChart3
} from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { useAdminStats } from '@/hooks/useAdminStats';
import Link from 'next/link';

export default function AdminDashboard() {
  const { stats, loading, error, refetch } = useAdminStats();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Gestion du rafraîchissement avec animation
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Calcul des statistiques dérivées
  const derivedStats = useMemo(() => {
    if (!stats) return null;

    return {
      userGrowthRate: ((stats.users.new / stats.users.total) * 100).toFixed(1),
      consultationSuccessRate: ((stats.consultations.completed / stats.consultations.total) * 100).toFixed(1),
      paymentSuccessRate: ((stats.payments.completed / stats.payments.total) * 100).toFixed(1),
      averageRevenue: (stats.consultations.revenue / stats.consultations.completed).toFixed(0),
    };
  }, [stats]);

  // État de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-amber-500 border-t-transparent 
                       rounded-full mx-auto mb-4"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 font-medium"
          >
            Chargement des statistiques...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-500 mt-2"
          >
            Veuillez patienter
          </motion.p>
        </div>
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
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Erreur de chargement
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white rounded-xl font-semibold hover:shadow-xl 
                       transform hover:scale-105 transition-all duration-200
                       flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 lg:pb-8">
      {/* En-tête avec bouton rafraîchir amélioré */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Titre et description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Tableau de bord
                </h1>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </motion.div>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Vue d'ensemble de votre plateforme
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            {/* Boutons d'action */}
            <div className="flex items-center gap-3">
              {/* Bouton Rafraîchir - Version Mobile et Desktop */}
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 
                           rounded-xl font-semibold transition-all duration-300
                           ${isRefreshing 
                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                             : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-xl'
                           }`}
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
                <span className="hidden sm:inline">
                  {isRefreshing ? 'Actualisation...' : 'Actualiser'}
                </span>
              </motion.button>

              {/* Bouton Rapport */}
              <Link
                href="/dashboard/admin/reports"
                className="hidden md:flex items-center gap-2 px-4 py-2.5 
                           text-gray-700 hover:bg-gray-100 rounded-xl 
                           transition-colors border border-gray-200"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Rapports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Animation de rafraîchissement */}
        <AnimatePresence>
          {isRefreshing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white 
                         rounded-xl p-3 mb-6 flex items-center justify-center gap-2 
                         shadow-lg"
            >
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="font-medium">Actualisation des données en cours...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Métriques d'activité du jour - Améliorée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 
                     rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-2xl 
                     relative overflow-hidden"
        >
          {/* Effet de fond animé */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Activité du jour</h2>
                  <p className="text-white/80 text-sm">Statistiques en temps réel</p>
                </div>
              </div>
              
              {/* Badge Live */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm 
                           rounded-full px-4 py-2 w-fit"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold">LIVE</span>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/15 rounded-xl p-4 sm:p-5 backdrop-blur-md 
                           border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-white/80" />
                  <p className="text-white/90 text-xs sm:text-sm font-medium">
                    Utilisateurs actifs
                  </p>
                </div>
                <p className="text-3xl sm:text-4xl font-bold mb-1">
                  {stats.activity.todayUsers}
                </p>
                <p className="text-white/70 text-xs">
                  +{((stats.activity.todayUsers / stats.users.total) * 100).toFixed(1)}% du total
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/15 rounded-xl p-4 sm:p-5 backdrop-blur-md 
                           border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-white/80" />
                  <p className="text-white/90 text-xs sm:text-sm font-medium">
                    Consultations
                  </p>
                </div>
                <p className="text-3xl sm:text-4xl font-bold mb-1">
                  {stats.activity.todayConsultations}
                </p>
                <p className="text-white/70 text-xs">
                  +{((stats.activity.todayConsultations / stats.consultations.total) * 100).toFixed(1)}% du total
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/15 rounded-xl p-4 sm:p-5 backdrop-blur-md 
                           border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-white/80" />
                  <p className="text-white/90 text-xs sm:text-sm font-medium">
                    Revenu
                  </p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold mb-1">
                  {stats.activity.todayRevenue.toLocaleString()} F
                </p>
                <p className="text-white/70 text-xs">
                  Moy: {derivedStats?.averageRevenue} F/consultation
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/15 rounded-xl p-4 sm:p-5 backdrop-blur-md 
                           border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-white/80" />
                  <p className="text-white/90 text-xs sm:text-sm font-medium">
                    Croissance
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-3xl sm:text-4xl font-bold">
                    {Math.abs(stats.activity.growth)}%
                  </p>
                  {stats.activity.growth >= 0 ? (
                    <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />
                  ) : (
                    <ArrowDownRight className="w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                </div>
                <p className="text-white/70 text-xs">
                  {stats.activity.growth >= 0 ? 'Tendance positive' : 'Tendance négative'}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Statistiques principales - Grid responsive amélioré */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8"
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

        {/* Détails par section - Design amélioré */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card Utilisateurs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl 
                       border border-gray-100 p-6 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Utilisateurs</h3>
              </div>
              <Link
                href="/dashboard/admin/users"
                className="text-amber-600 hover:text-amber-700 text-sm font-semibold
                           hover:underline transition-all"
              >
                Voir tout →
              </Link>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-green-100 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  Actifs
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.users.active}
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  Nouveaux
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.users.new}
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-gray-100 rounded-md">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  Inactifs
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.users.inactive}
                </span>
              </motion.div>
            </div>

            {/* Barre de progression */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Taux d'activation</span>
                <span className="font-semibold text-gray-900">
                  {((stats.users.active / stats.users.total) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.users.active / stats.users.total) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Card Consultations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl 
                       border border-gray-100 p-6 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Consultations</h3>
              </div>
              <Link
                href="/dashboard/admin/consultations"
                className="text-amber-600 hover:text-amber-700 text-sm font-semibold
                           hover:underline transition-all"
              >
                Voir tout →
              </Link>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-orange-100 rounded-md">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  En attente
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.consultations.pending}
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-green-100 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  Complétées
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.consultations.completed}
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-amber-100 rounded-md">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                  </div>
                  Revenu
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.consultations.revenue.toLocaleString()} F
                </span>
              </motion.div>
            </div>

            {/* Barre de progression */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Taux de complétion</span>
                <span className="font-semibold text-gray-900">
                  {derivedStats?.consultationSuccessRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl 
                       border border-gray-100 p-6 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Paiements</h3>
              </div>
              <Link
                href="/dashboard/admin/payments"
                className="text-amber-600 hover:text-amber-700 text-sm font-semibold
                           hover:underline transition-all"
              >
                Voir tout →
              </Link>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-orange-100 rounded-md">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  En attente
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.payments.pending}
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-green-100 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  Réussis
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.payments.completed}
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-3 px-4 
                           rounded-lg hover:bg-gray-50 transition-all"
              >
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <div className="p-1.5 bg-red-100 rounded-md">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                  Échoués
                </span>
                <span className="font-bold text-gray-900 text-lg">
                  {stats.payments.failed}
                </span>
              </motion.div>
            </div>

            {/* Barre de progression */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Taux de succès</span>
                <span className="font-semibold text-gray-900">
                  {derivedStats?.paymentSuccessRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${derivedStats?.paymentSuccessRate}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
