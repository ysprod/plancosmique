'use client';
import DeleteUserModal from '@/components/users/DeleteUserModal';
import UserCard from '@/components/users/UserCard';
import UsersStats from '@/components/users/UsersStats';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import api from '@/lib/api/client';
import { UserData } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Users,
  X,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

type UserStatus = 'all' | 'active' | 'inactive';
type UserRole = 'all' | 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
  const [roleFilter, setRoleFilter] = useState<UserRole>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; user: UserData | null }>({
    show: false,
    user: null
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { users: apiUsers, total, loading, error, refetch } = useAdminUsers({
    search: searchQuery,
    status: statusFilter,
    role: roleFilter,
    page: currentPage,
    limit: 18,
  });

  const mapUserToUserData = (user: any): UserData => ({
    id: user.id,
    _id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone || user.telephone,
    country: user.country,
    gender: user.gender === 'M' || user.gender === 'F' || user.gender === 'Other' ? user.gender : 'Other',
    role: user.role,
    isActive: user.isActive,
    emailVerified: user.emailVerified,
    credits: user.credits,
    preferences: user.preferences,
    totalConsultations: user.totalConsultations ?? user.consultationsCount ?? 0,
    rating: user.rating,
    createdAt: user.createdAt,
    premium: user.premium || false,
  });

  const users: UserData[] = useMemo(() => (apiUsers ? apiUsers.map(mapUserToUserData) : []), [apiUsers]);
console.log(users);
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



  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setRoleFilter('all');
    setCurrentPage(1);
  }, []);

  // 🗑️ Fonction de suppression d'utilisateur
  const handleDeleteUser = useCallback(async (userId: string) => {
    setIsDeleting(true);
    try {
      await api.delete(`/admin/users/${userId}`);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteModal({ show: false, user: null });
        setDeleteSuccess(false);
        setIsDeleting(false);
        refetch();
      }, 1500);
    } catch (error: any) {
      console.error('Erreur suppression:', error);
      alert(error?.response?.data?.message || error?.message || 'Erreur lors de la suppression');
      setIsDeleting(false);
    }
  }, [refetch]);

  const totalPages = Math.ceil(total / 18);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm w-full bg-white rounded-xl shadow-xl border border-gray-200 p-6"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
            }}
          >
            <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-3" />
          </motion.div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{error}</p>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white text-sm rounded-lg font-semibold hover:shadow-lg 
                       transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Chargement...' : 'Réessayer'}
          </button>
        </motion.div>
      </div>
    );
  }

  if (loading && !users) {
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
            className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-sm text-gray-900 font-semibold">Chargement des utilisateurs...</p>
          <p className="text-xs text-gray-500 mt-1">Veuillez patienter</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DeleteUserModal
        show={deleteModal.show}
        user={deleteModal.user}
        isDeleting={isDeleting}
        deleteSuccess={deleteSuccess}
        onClose={() => setDeleteModal({ show: false, user: null })}
        onDelete={() => {
          if (deleteModal.user && deleteModal.user.id) {
            handleDeleteUser(deleteModal.user.id);
          }
        }}
        modalVariants={modalVariants}
      />

      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Utilisateurs
                </h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {total} au total
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-all ${isRefreshing || loading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
              </motion.button>

              <Link
                href="/admin/users/new"
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
        <AnimatePresence>
          {(loading || isRefreshing) && users && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                         rounded-lg p-3 flex items-center justify-center gap-2 shadow-md"
            >
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">
                Mise à jour des données en cours...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {stats && (
          <UsersStats stats={stats} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
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
                           disabled:bg-gray-50 disabled:cursor-not-allowed
                           transition-all"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 
                             hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg 
                         font-medium transition-all disabled:opacity-50 
                         disabled:cursor-not-allowed ${showFilters || statusFilter !== 'all' || roleFilter !== 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
            </motion.button>
          </div>

          {/* Panneau filtres avec animation */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-200 rounded-lg p-3 mt-2 overflow-hidden"
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
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleResetFilters}
                    disabled={loading}
                    className="text-xs text-amber-600 hover:text-amber-700 
                               font-medium flex items-center gap-1 mt-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-3 h-3" />
                    Réinitialiser
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="relative">
          <AnimatePresence>
            {loading && users && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 
                           rounded-lg flex items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 
                                flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <p className="text-sm font-semibold text-gray-900">
                    Chargement...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {users && users.length > 0 ? (
            <div className="space-y-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
              >
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    cardVariants={cardVariants}
                    setDeleteModal={setDeleteModal}
                  />
                ))}
              </motion.div>

              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between bg-white 
                            rounded-lg border border-gray-200 px-3 py-2 shadow-sm"
                >
                  <p className="text-xs text-gray-600 font-medium">
                    Page {currentPage} sur {totalPages}
                  </p>
                  <div className="flex gap-1.5">
                    <motion.button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded 
                                 font-medium hover:bg-gray-200 disabled:opacity-50 
                                 disabled:cursor-not-allowed transition-all"
                    >
                      ← Préc
                    </motion.button>
                    <motion.button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 
                                 text-white text-xs rounded font-medium hover:shadow-md 
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Suiv →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg border border-gray-200 p-8 text-center"
            >
              <Users className="w-14 h-14 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'all' || roleFilter !== 'all'
                  ? 'Aucun résultat ne correspond à vos critères'
                  : 'Commencez par ajouter votre premier utilisateur'}
              </p>
              {(searchQuery || statusFilter !== 'all' || roleFilter !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 
                             text-white text-sm rounded-lg font-medium hover:shadow-md
                             transition-all"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
