'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Trash2, Settings, Filter, ArrowLeft } from 'lucide-react';
import { useNotifications } from '@/lib/hooks';
import Link from 'next/link';
import type { Notification } from '@/types/notification.types';

const notificationIcons = {
  CONSULTATION_RESULT: '✨',
  NEW_KNOWLEDGE: '📚',
  CONSULTATION_ASSIGNED: '📋',
  PAYMENT_CONFIRMED: '💳',
  SYSTEM_ANNOUNCEMENT: '🔔',
};

const notificationColors = {
  CONSULTATION_RESULT: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  NEW_KNOWLEDGE: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  CONSULTATION_ASSIGNED: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  PAYMENT_CONFIRMED: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  SYSTEM_ANNOUNCEMENT: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
};

const filterOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'unread', label: 'Non lues' },
  { value: 'CONSULTATION_RESULT', label: 'Résultats' },
  { value: 'NEW_KNOWLEDGE', label: 'Nouvelles connaissances' },
  { value: 'CONSULTATION_ASSIGNED', label: 'Consultations assignées' },
  { value: 'PAYMENT_CONFIRMED', label: 'Paiements' },
  { value: 'SYSTEM_ANNOUNCEMENT', label: 'Annonces système' },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [showSettings, setShowSettings] = useState(false);
  
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    markAsRead, 
    markAllAsRead,
    deleteNotification,
    fetchNotifications 
  } = useNotifications(0); // Pas de polling automatique sur cette page

  // Recharger à l'ouverture
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
    
    if (notification.metadata?.url) {
      window.location.href = notification.metadata.url;
    }
  };

  const handleDelete = async (notificationId: string) => {
    await deleteNotification(notificationId);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.type === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
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
                    : 'Toutes vos notifications sont lues'
                  }
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

          {/* Filtres */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filter === option.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Chargement des notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="w-20 h-20 text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              {filter === 'all' ? 'Aucune notification' : 'Aucune notification pour ce filtre'}
            </h2>
            <p className="text-gray-400 text-center max-w-md">
              {filter === 'all' 
                ? "Vous n'avez aucune notification pour le moment. Nous vous tiendrons informé des nouveautés !"
                : 'Essayez de modifier le filtre pour voir plus de notifications.'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-4 max-w-4xl mx-auto">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNotificationClick(notification)}
                className={`relative p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  notification.isRead 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icône */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${notificationColors[notification.type]} border flex items-center justify-center text-2xl`}>
                    {notificationIcons[notification.type]}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-lg font-semibold mb-1 ${
                          notification.isRead ? 'text-gray-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {notification.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.isRead && (
                          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notification._id);
                          }}
                          className="p-2 hover:bg-red-500/20 rounded-xl transition-colors text-gray-400 hover:text-red-400"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>
                        {new Date(notification.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {notification.metadata?.url && (
                        <span className="text-purple-400">→ Cliquez pour voir</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Panel de paramètres (optionnel pour une future version) */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-white mb-4">Paramètres de notifications</h2>
            <p className="text-gray-400 text-sm">
              Les paramètres de notifications seront disponibles prochainement.
              Vous pourrez choisir les types de notifications à recevoir et configurer les alertes.
            </p>
            <button
              onClick={() => setShowSettings(false)}
              className="mt-4 w-full px-4 py-2 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
