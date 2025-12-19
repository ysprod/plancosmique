'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { useNotifications } from '@/lib/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import type { Notification } from '@/types/notification.types';

const notificationIcons = {
  CONSULTATION_RESULT: '✨',
  NEW_KNOWLEDGE: '📚',
  CONSULTATION_ASSIGNED: '📋',
  PAYMENT_CONFIRMED: '💳',
  SYSTEM_ANNOUNCEMENT: '🔔',
};

const notificationColors = {
  CONSULTATION_RESULT: 'from-purple-500/20 to-pink-500/20',
  NEW_KNOWLEDGE: 'from-blue-500/20 to-cyan-500/20',
  CONSULTATION_ASSIGNED: 'from-green-500/20 to-emerald-500/20',
  PAYMENT_CONFIRMED: 'from-amber-500/20 to-orange-500/20',
  SYSTEM_ANNOUNCEMENT: 'from-gray-500/20 to-slate-500/20',
};

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    markAsRead, 
    markAllAsRead,
    deleteNotification 
  } = useNotifications();

  // Fermer le dropdown quand on clique dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
    
    // Naviguer vers le lien si disponible dans metadata
    if (notification.metadata?.url) {
      window.location.href = notification.metadata.url;
    }
  };

  const handleDelete = async (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    await deleteNotification(notificationId);
  };

  const handleMarkAllRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await markAllAsRead();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton de notification */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-violet-100 transition-colors duration-200"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-violet-600" />
        
        {/* Badge de compteur */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown des notifications */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 max-h-[600px] bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold">
                Notifications {unreadCount > 0 && `(${unreadCount})`}
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  Tout marquer comme lu
                </button>
              )}
            </div>

            {/* Liste des notifications */}
            <div className="overflow-y-auto max-h-[500px] custom-scrollbar">
              {isLoading ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-2">Chargement...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:bg-white/5 ${
                        !notification.isRead ? 'bg-white/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icône */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${notificationColors[notification.type]} flex items-center justify-center text-xl`}>
                          {notificationIcons[notification.type]}
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm font-medium ${
                              notification.isRead ? 'text-gray-300' : 'text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {!notification.isRead && (
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                              )}
                              <button
                                onClick={(e) => handleDelete(e, notification._id)}
                                className="p-1 hover:bg-red-500/20 rounded transition-colors text-gray-400 hover:text-red-400"
                                aria-label="Supprimer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-white/10">
                <a
                  href="/secured/notifications"
                  className="block text-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Voir toutes les notifications
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Style pour la scrollbar personnalisée */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
      `}</style>
    </div>
  );
}
