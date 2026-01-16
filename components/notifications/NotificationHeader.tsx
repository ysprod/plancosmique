'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowLeft, CheckCheck, Settings } from 'lucide-react';
import Link from 'next/link';

interface NotificationHeaderProps {
  unreadCount: number;
  markAllAsRead: () => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ unreadCount, markAllAsRead, showSettings, setShowSettings }) => (
  <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-10">
    <div className="mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/secured/profil">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bell className="w-7 h-7" />
              Notifications
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {unreadCount > 0
                ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                : 'Toutes vos notifications sont lues'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-colors flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Tout marquer comme lu</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  </div>
);

export default NotificationHeader;
