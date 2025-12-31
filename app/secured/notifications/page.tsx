'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Trash2, Settings, Filter, ArrowLeft } from 'lucide-react';
import { useNotifications } from '@/lib/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Notification } from '@/lib/types/notification.types';
import useNotificationFilter from '@/hooks/notifications/useNotificationFilter';
import NotificationHeader from '@/components/notifications/NotificationHeader';
import NotificationFilterBar from '@/components/notifications/NotificationFilterBar';
import NotificationList from '@/components/notifications/NotificationList';
import NotificationSettingsModal from '@/components/notifications/NotificationSettingsModal';

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

const filterOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'unread', label: 'Non lues' },
  { value: 'CONSULTATION_RESULT', label: 'Résultats' },
  { value: 'CONSULTATION_ASSIGNED', label: 'Consultations assignées' },
  { value: 'PAYMENT_CONFIRMED', label: 'Paiements' },
  { value: 'SYSTEM_ANNOUNCEMENT', label: 'Annonces système' },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { filter, setFilter } = useNotificationFilter();
  const [showSettings, setShowSettings] = useState(false);
  const {
    notifications, unreadCount, isLoading,
    markAsRead, markAllAsRead, deleteNotification, fetchNotifications
  } = useNotifications(0);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
    if (notification.metadata?.url) {
      window.location.href = notification.metadata.url;
      return;
    }
    if (
      (notification.type === 'CONSULTATION_RESULT' || notification.type === 'CONSULTATION_ASSIGNED') &&
      notification.metadata?.consultationId
    ) {
      router.push(`/secured/consultations/${notification.metadata.consultationId}`);
      return;
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
      <NotificationHeader
        unreadCount={unreadCount}
        markAllAsRead={markAllAsRead}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <NotificationFilterBar filter={filter} setFilter={setFilter} />
      <div className="container mx-auto px-4 py-8">
        <NotificationList
          notifications={filteredNotifications}
          isLoading={isLoading}
          filter={filter}
          onNotificationClick={handleNotificationClick}
          onDelete={handleDelete}
        />
      </div>
      <NotificationSettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
