'use client';

import { motion } from 'framer-motion';
import { BarChart3, Clock, RefreshCw, Target } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  lastUpdated?: string;
  isRefreshing: boolean;
  loading: boolean;
  onRefresh: () => void;
}

export default function AdminHeader({ lastUpdated, isRefreshing, loading, onRefresh }: AdminHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Tableau de bord</h1>
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
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onRefresh}
              disabled={isRefreshing || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${isRefreshing || loading
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
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 text-sm font-medium"
            >
              <Target className="w-4 h-4" />
              Rapports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}