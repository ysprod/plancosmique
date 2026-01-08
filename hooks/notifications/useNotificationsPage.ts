import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useNotificationFilter from '@/hooks/notifications/useNotificationFilter';
import { useNotifications } from '@/lib/hooks';
import type { Notification } from '@/lib/types/notification.types';

export function useNotificationsPage() {
  const router = useRouter();
  const { filter, setFilter } = useNotificationFilter();
  const {
    notifications, unreadCount, isLoading,
    markAsRead, markAllAsRead, deleteNotification, fetchNotifications
  } = useNotifications(0);
  const [showSettings, setShowSettings] = useState(false);

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

  return {
    filter,
    setFilter,
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
    showSettings,
    setShowSettings,
    handleNotificationClick,
    handleDelete,
    filteredNotifications
  };
}
