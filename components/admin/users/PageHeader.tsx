import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Plus, Users, Zap } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  total: number;
  isRefreshing: boolean;
  loading: boolean;
  onRefresh: () => void;
}

const PageHeader = memo<PageHeaderProps>(({ total, isRefreshing, loading, onRefresh }) => (
  <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
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
            onClick={onRefresh}
            disabled={isRefreshing || loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-2 rounded-lg transition-all
              ${isRefreshing || loading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
              }
            `}
            aria-label="Rafraîchir la liste"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
          </motion.button>
          <Link
            href="/admin/users/new"
            className="
              flex items-center gap-1.5 px-3 py-2 
              bg-gradient-to-r from-blue-600 to-blue-700 
              text-white text-sm rounded-lg font-semibold 
              hover:shadow-md hover:from-blue-700 hover:to-blue-800
              transition-all active:scale-95
            "
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
));

PageHeader.displayName = 'PageHeader';

export default PageHeader;
