/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useUser } from '@/lib/hooks';
import type { User } from '@/types/auth.types';
import { Role } from '@/types/auth.types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar, ChevronLeft, ChevronRight, Download, Edit, Eye,
  Filter, Loader2, Mail, MoreVertical, Phone, RefreshCw,
  Search, Shield, Trash2, UserPlus, Users, X
} from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface UsersListProps {
  onUserSelect?: (user: User) => void;
  onCreateUser?: () => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 1, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export const UsersList: React.FC<UsersListProps> = ({
  onUserSelect,
  onCreateUser,
}) => {
  const { listUsers, deleteUser, loading, error } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Modifié pour la grille
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | ''>('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mémoïsation de fetchUsers avec useCallback
  const fetchUsers = useCallback(async () => {
    const params: any = { page, limit };
    if (search) params.search = search;
    if (roleFilter) params.role = roleFilter;

    const result = await listUsers(params);
    if (result) {
      const usersArr = Array.isArray(result.data)
        ? result.data
        : Array.isArray((result as any).users)
          ? (result as any).users
          : [];
      setUsers(usersArr);
      setTotal(typeof result.total === 'number'
        ? result.total
        : usersArr.length
      );
    }
  }, [page, limit, search, roleFilter, listUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Refresh manuel
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Gestion de la suppression
  const handleDelete = async (id: string, userName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userName}" ?\n\nCette action est irréversible.`)) {
      return;
    }

    const success = await deleteUser(id);
    if (success) {
      await fetchUsers();
      setActiveMenu(null);
    }
  };

  // Couleurs des badges de rôles
  const getRoleBadgeColor = useCallback((role: Role) => {
    const colors = {
      [Role.SUPER_ADMIN]: 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg shadow-red-500/30',
      [Role.ADMIN]: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-500/30',
      [Role.CONSULTANT]: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg shadow-blue-500/30',
      [Role.USER]: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg shadow-green-500/30',
      [Role.GUEST]: 'bg-gradient-to-r from-slate-400 to-slate-500 text-white border-0 shadow-lg shadow-slate-500/30',
    };
    return colors[role] || colors[Role.GUEST];
  }, []);

  // Icône du rôle
  const getRoleIcon = useCallback((role: Role) => {
    const icons = {
      [Role.SUPER_ADMIN]: '👑',
      [Role.ADMIN]: '⚡',
      [Role.CONSULTANT]: '💼',
      [Role.USER]: '👤',
      [Role.GUEST]: '🔍',
    };
    return icons[role] || icons[Role.GUEST];
  }, []);

  // Couleur de l'avatar
  const getAvatarGradient = useCallback((index: number) => {
    const gradients = [
      'from-violet-500 via-purple-500 to-fuchsia-500',
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-green-500 via-emerald-500 to-teal-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-yellow-500 via-orange-500 to-red-500',
    ];
    return gradients[index % gradients.length];
  }, []);

  // Calcul des statistiques
  const stats = useMemo(() => {
    const roleCount = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<Role, number>);

    const activeCount = users.filter(u => u.isActive).length;

    return { roleCount, activeCount };
  }, [users]);

  const totalPages = Math.ceil(total / limit);

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Notification d'erreur */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-2 border-red-200 rounded-2xl flex items-start gap-3 shadow-lg"
            >
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold">
                !
              </div>
              <div className="flex-1">
                <strong className="font-bold">Erreur</strong>
                <p className="text-sm mt-1">{error}</p>
              </div>
              <button className="text-red-500 hover:text-red-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 relative overflow-hidden"
        >
          {/* Décorations d'arrière-plan */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-fuchsia-200/30 to-pink-200/30 rounded-full blur-3xl -ml-24 -mb-24" />

          <div className="relative z-10">
            {/* Titre et actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  Gestion des utilisateurs
                </h1>
                <p className="text-slate-600 ml-[4.5rem] text-lg">
                  {total} utilisateur{total > 1 ? 's' : ''} · {stats.activeCount} actif{stats.activeCount > 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Bouton Refresh */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-white text-violet-600 px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border-2 border-violet-100"
                >
                  <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Actualiser</span>
                </motion.button>

                {onCreateUser && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCreateUser}
                    className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-violet-500/40 transition-all flex items-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Nouvel utilisateur
                  </motion.button>
                )}
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {Object.entries(stats.roleCount).map(([role, count]) => (
                <motion.div
                  key={role}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-2">{getRoleIcon(role as Role)}</div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{count}</div>
                  <div className="text-xs text-slate-600 font-semibold uppercase tracking-wide">{role}</div>
                </motion.div>
              ))}
            </div>

            {/* Filtres */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Recherche */}
              <div className="md:col-span-6 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher par nom, email ou téléphone..."
                  className="w-full pl-12 pr-10 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-white shadow-sm font-medium"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filtre de rôle */}
              <div className="md:col-span-4 relative group">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                <select
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value as Role | '');
                    setPage(1);
                  }}
                  className="w-full pl-12 pr-10 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all appearance-none cursor-pointer bg-white shadow-sm font-medium"
                >
                  <option value="">Tous les rôles</option>
                  <option value={Role.SUPER_ADMIN}>👑 Super Admin</option>
                  <option value={Role.ADMIN}>⚡ Admin</option>
                  <option value={Role.CONSULTANT}>💼 Consultant</option>
                  <option value={Role.USER}>👤 Utilisateur</option>
                  <option value={Role.GUEST}>🔍 Invité</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none rotate-90" />
              </div>

              {/* Bouton Export */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:col-span-2 bg-white border-2 border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span className="hidden lg:inline">Exporter</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Liste des utilisateurs en grille */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-violet-500/40">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <p className="text-slate-600 font-semibold text-lg">Chargement des utilisateurs...</p>
          </motion.div>
        ) : (users ?? []).length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-20 text-center"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-slate-400" />
            </div>
            <p className="text-slate-900 text-2xl font-bold mb-3">Aucun utilisateur trouvé</p>
            <p className="text-slate-500 text-lg">Essayez de modifier vos critères de recherche</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {users.map((user, index) => (
                <motion.div
                  key={user._id}
                  variants={cardVariants}
                  layout
                  onClick={() => onUserSelect?.(user)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-slate-100 hover:border-violet-300 transition-all cursor-pointer overflow-hidden relative"
                >
                  {/* Header de la carte avec gradient */}
                  <div className={`h-24 bg-gradient-to-r ${getAvatarGradient(index)} relative`}>
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Badge de statut */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${user.isActive
                          ? 'bg-white/90 text-green-600'
                          : 'bg-black/30 text-white'
                          }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-slate-400'} animate-pulse`} />
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </div>

                    {/* Menu contextuel */}
                    <div className="absolute top-3 left-3" onClick={(e) => e.stopPropagation()}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveMenu(activeMenu === user._id ? null : user._id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-all shadow-lg"
                      >
                        <MoreVertical className="w-4 h-4 text-slate-700" />
                      </motion.button>

                      <AnimatePresence>
                        {activeMenu === user._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -10 }}
                            className="absolute left-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50"
                          >
                            <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 font-medium text-slate-700">
                              <Shield className="w-4 h-4 text-violet-600" />
                              Modifier les permissions
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 font-medium text-slate-700">
                              <Mail className="w-4 h-4 text-blue-600" />
                              Envoyer un email
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex justify-center -mt-12 mb-4 px-6">
                    <div className="relative">
                      <div className={`w-24 h-24 bg-gradient-to-br ${getAvatarGradient(index)} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white group-hover:scale-110 transition-transform`}>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      {user.isActive && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="px-6 pb-6 space-y-4">
                    {/* Nom */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors mb-1">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        ID: {user._id.slice(-8)}
                      </p>
                    </div>

                    {/* Badge de rôle */}
                    <div className="flex justify-center">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${getRoleBadgeColor(user.role)}`}
                      >
                        <span className="text-lg">{getRoleIcon(user.role)}</span>
                        {user.role}
                      </motion.span>
                    </div>

                    {/* Informations de contact */}
                    <div className="space-y-2.5 bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-700 truncate">{user.email}</span>
                      </div>

                      {user.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-medium text-slate-700">{user.phone}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-sm pt-2 border-t border-slate-200">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-700">
                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(user.createdAt).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Link
                          href={`/admin/users/${user._id}`}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border-2 border-transparent hover:border-blue-200 font-semibold text-sm"
                          title="Voir le profil"
                        >
                          <Eye className="w-4 h-4" />
                          Voir
                        </Link>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Link
                          href={`/admin/users/${user._id}/edit`}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-xl transition-all border-2 border-transparent hover:border-violet-200 font-semibold text-sm"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                          Éditer
                        </Link>
                      </motion.div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleDelete(user._id, `${user.firstName} ${user.lastName}`, e)}
                        className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all border-2 border-transparent hover:border-red-200"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {(users ?? []).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-sm text-slate-700 font-medium">
              Affichage de <span className="font-bold text-violet-600">{((page - 1) * limit) + 1}</span> à <span className="font-bold text-violet-600">{Math.min(page * limit, total)}</span> sur <span className="font-bold text-violet-600">{total}</span> utilisateur{total > 1 ? 's' : ''}
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-3 border-2 border-slate-200 rounded-xl hover:bg-violet-50 hover:border-violet-500 hover:text-violet-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:bg-transparent shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <motion.button
                      key={pageNum}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setPage(pageNum)}
                      className={`w-11 h-11 rounded-xl font-bold transition-all ${page === pageNum
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/40'
                        : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-violet-500 hover:text-violet-600'
                        }`}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-3 border-2 border-slate-200 rounded-xl hover:bg-violet-50 hover:border-violet-500 hover:text-violet-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:bg-transparent shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
