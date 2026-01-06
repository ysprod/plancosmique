import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import type { Notification } from '@/lib/types/notification.types';

const notificationIcons = {
  CONSULTATION_RESULT: '✨',
  CONSULTATION_ASSIGNED: '📋',
  PAYMENT_CONFIRMED: '💳',
  SYSTEM_ANNOUNCEMENT: '🔔',
};

const notificationColors = {
  CONSULTATION_RESULT: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  CONSULTATION_ASSIGNED: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  PAYMENT_CONFIRMED: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  SYSTEM_ANNOUNCEMENT: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
};

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  filter: string;
  onNotificationClick: (notification: Notification) => void;
  onDelete: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, isLoading, filter, onNotificationClick, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-gray-400">Chargement des notifications...</p>
      </div>
    );
  }
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Bell className="w-20 h-20 text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          {filter === 'all' ? 'Aucune notification' : 'Aucune notification pour ce filtre'}
        </h2>
        <p className="text-gray-400 text-center max-w-md">
          {filter === 'all'
            ? "Vous n'avez aucune notification pour le moment. Nous vous tiendrons informé des nouveautés !"
            : 'Essayez de modifier le filtre pour voir plus de notifications.'}
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 max-w-4xl mx-auto">
      {notifications.map((notification, index) => (
        <motion.div
          key={notification._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onNotificationClick(notification)}
          className={`relative p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${notification.isRead
            ? 'bg-white/5 border-white/10'
            : 'bg-white/10 border-white/20'
            }`}
        >
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${notificationColors[notification.type]} border flex items-center justify-center text-2xl`}>
              {notificationIcons[notification.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${notification.isRead ? 'text-gray-300' : 'text-white'}`}>{notification.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{notification.message}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.isRead && <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>}
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(notification._id); }}
                    className="p-2 hover:bg-red-500/20 rounded-xl transition-colors text-gray-400 hover:text-red-400"
                    aria-label="Supprimer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span>{new Date(notification.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                {notification.metadata?.url && <span className="text-purple-400">→ Cliquez pour voir</span>}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NotificationList;