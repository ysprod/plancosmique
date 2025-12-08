'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Search, Filter, 
  Mail, Phone, Shield, Globe, Calendar,
  CheckCircle, Edit, Trash2, Ban,
  X, AlertCircle, RefreshCw, Clock, Star, CreditCard, User
} from 'lucide-react';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import Link from 'next/link';

type UserStatus = 'all' | 'active' | 'inactive';
type UserRole = 'all' | 'USER' | 'ADMIN';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
  const [roleFilter, setRoleFilter] = useState<UserRole>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { users, total, loading, error, refetch } = useAdminUsers({
    search: searchQuery,
    status: statusFilter,
    role: roleFilter,
    page: currentPage,
    limit: 18,
  });

  const stats = useMemo(() => {
    if (!users) return null;
    return {
      total: users.length,
      active: users.filter(u => u.isActive).length,
      inactive: users.filter(u => !u.isActive).length,
      admins: users.filter(u => u.role === 'ADMIN').length,
      verified: users.filter(u => u.emailVerified).length,
    };
  }, [users]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setRoleFilter('all');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / 18);

  if (loading && !users) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-sm text-gray-600 font-medium">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm w-full bg-white rounded-xl shadow-lg p-6"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Erreur</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white text-sm rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête compact */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Utilisateurs
                </h1>
                <p className="text-xs text-gray-500">{total} total</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-2 rounded-lg transition-all ${
                  isRefreshing 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              <Link
                href="/dashboard/admin/users/new"
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r 
                           from-blue-600 to-blue-700 text-white text-sm rounded-lg 
                           font-semibold hover:shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        {/* Loader de rafraîchissement */}
        <AnimatePresence>
          {(loading || isRefreshing) && users && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 
                         flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
              <p className="text-sm text-blue-700 font-medium">
                Mise à jour des données...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats compactes */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-50 rounded">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Actifs</p>
                  <p className="text-lg font-bold text-gray-900">{stats.active}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gray-50 rounded">
                  <Clock className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Inactifs</p>
                  <p className="text-lg font-bold text-gray-900">{stats.inactive}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-purple-50 rounded">
                  <Shield className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Admins</p>
                  <p className="text-lg font-bold text-gray-900">{stats.admins}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-amber-50 rounded">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vérifiés</p>
                  <p className="text-lg font-bold text-gray-900">{stats.verified}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barre de recherche compacte */}
        <div className="mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Rechercher par nom, email, téléphone..."
                disabled={loading}
                className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                           pl-8 pr-8 py-2 rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-amber-400 focus:border-transparent
                           disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              disabled={loading}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg 
                         font-medium transition-all disabled:opacity-50 
                         disabled:cursor-not-allowed ${
                showFilters || statusFilter !== 'all' || roleFilter !== 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
            </button>
          </div>

          {/* Panneau filtres compact */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-3 mt-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      Statut
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value as UserStatus);
                        setCurrentPage(1);
                      }}
                      disabled={loading}
                      className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                 px-2 py-1.5 rounded focus:ring-2 focus:ring-amber-400
                                 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="all">Tous statuts</option>
                      <option value="active">Actifs</option>
                      <option value="inactive">Inactifs</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      Rôle
                    </label>
                    <select
                      value={roleFilter}
                      onChange={(e) => {
                        setRoleFilter(e.target.value as UserRole);
                        setCurrentPage(1);
                      }}
                      disabled={loading}
                      className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                 px-2 py-1.5 rounded focus:ring-2 focus:ring-amber-400
                                 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="all">Tous rôles</option>
                      <option value="USER">Utilisateur</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>

                {(statusFilter !== 'all' || roleFilter !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    disabled={loading}
                    className="text-xs text-amber-600 hover:text-amber-700 
                               font-medium flex items-center gap-1 mt-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-3 h-3" />
                    Réinitialiser
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grille ultra-compacte avec loader overlay */}
        <div className="relative">
          {/* Overlay de chargement */}
          <AnimatePresence>
            {loading && users && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 
                           rounded-lg flex items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <p className="text-sm font-medium text-gray-900">
                    Chargement...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {users && users.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-lg border border-gray-200 p-3 
                               hover:shadow-lg transition-all"
                  >
                    {/* En-tête compact */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 
                                      rounded-full flex items-center justify-center 
                                      text-white font-bold text-sm shadow-md">
                        {user.username[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                          {user.username}
                        </h3>
                        <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Infos compactes */}
                    <div className="space-y-1 mb-2.5 pb-2.5 border-b border-gray-100">
                      {user.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          {user.phone}
                        </div>
                      )}
                      {user.country && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Globe className="w-3 h-3 flex-shrink-0" />
                          {user.country}
                        </div>
                      )}
                      {user.gender && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <User className="w-3 h-3 flex-shrink-0" />
                          {user.gender === 'male' ? 'Homme' : 'Femme'}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    {/* Métriques */}
                    <div className="grid grid-cols-3 gap-1.5 mb-2.5 pb-2.5 border-b border-gray-100">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Consultations</p>
                        <p className="text-sm font-bold text-gray-900">{user.totalConsultations}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Note</p>
                        <div className="flex items-center justify-center gap-0.5">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <p className="text-sm font-bold text-gray-900">{user.rating}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Crédits</p>
                        <div className="flex items-center justify-center gap-0.5">
                          <CreditCard className="w-3 h-3 text-green-500" />
                          <p className="text-sm font-bold text-gray-900">{user.credits}</p>
                        </div>
                      </div>
                    </div>

                    {/* Badges mini */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 
                                      rounded-full text-xs font-medium ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'ADMIN' && <Shield className="w-2.5 h-2.5" />}
                        {user.role}
                      </span>

                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 
                                      rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.isActive ? (
                          <CheckCircle className="w-2.5 h-2.5" />
                        ) : (
                          <Ban className="w-2.5 h-2.5" />
                        )}
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </span>

                      {user.emailVerified && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 
                                       rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-2.5 h-2.5" />
                          Vérifié
                        </span>
                      )}

                      {user.preferences?.notifications && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 
                                       rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                          🔔
                        </span>
                      )}
                    </div>

                    {/* Boutons compacts */}
                    <div className="flex gap-1.5">
                      <Link
                        href={`/dashboard/admin/users/${user.id}`}
                        className="flex-1 flex items-center justify-center gap-1 
                                   px-2 py-1.5 bg-blue-600 text-white text-xs 
                                   rounded font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        Modifier
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer ${user.username} ?`)) {
                            console.log('Supprimer:', user.id);
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-1 
                                   px-2 py-1.5 bg-red-600 text-white text-xs 
                                   rounded font-medium hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Supprimer
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination compacte */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white 
                                rounded-lg border border-gray-200 px-3 py-2">
                  <p className="text-xs text-gray-600">
                    Page {currentPage}/{totalPages}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || loading}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded 
                                 font-medium hover:bg-gray-200 disabled:opacity-50 
                                 disabled:cursor-not-allowed"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || loading}
                      className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 
                                 text-white text-xs rounded font-medium hover:shadow-md 
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Aucun utilisateur
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'all' || roleFilter !== 'all'
                  ? 'Aucun résultat trouvé'
                  : 'Ajoutez votre premier utilisateur'}
              </p>
              {(searchQuery || statusFilter !== 'all' || roleFilter !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 
                             text-white text-sm rounded-lg font-medium hover:shadow-md"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
