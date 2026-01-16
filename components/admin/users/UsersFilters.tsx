'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';

interface UsersFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  handleResetFilters: () => void;
  loading: boolean;
}

const UsersFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  showFilters,
  setShowFilters,
  handleResetFilters,
  loading
}: UsersFiltersProps) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-4">
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); }}
          placeholder="Rechercher par nom, email, téléphone..."
          disabled={loading}
          className="w-full bg-white border border-gray-300 text-sm text-gray-900 pl-8 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
        />
        {searchQuery && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${showFilters || statusFilter !== 'all' || roleFilter !== 'all' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
      >
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline">Filtres</span>
      </motion.button>
    </div>
    <AnimatePresence>
      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="bg-white border border-gray-200 rounded-lg p-3 mt-2 overflow-hidden">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Statut</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} disabled={loading} className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-2 py-1.5 rounded focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50 disabled:cursor-not-allowed">
                <option value="all">Tous statuts</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Rôle</label>
              <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} disabled={loading} className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-2 py-1.5 rounded focus:ring-2 focus:ring-amber-400 disabled:bg-gray-50 disabled:cursor-not-allowed">
                <option value="all">Tous rôles</option>
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
          {(statusFilter !== 'all' || roleFilter !== 'all') && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleResetFilters} disabled={loading} className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <X className="w-3 h-3" />
              Réinitialiser
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default UsersFilters;
