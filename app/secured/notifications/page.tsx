'use client';
import NotificationFilterBar from '@/components/notifications/NotificationFilterBar';
import NotificationHeader from '@/components/notifications/NotificationHeader';
import NotificationList from '@/components/notifications/NotificationList';
import NotificationSettingsModal from '@/components/notifications/NotificationSettingsModal';
import useNotificationFilter from '@/hooks/notifications/useNotificationFilter';
import { useNotifications } from '@/lib/hooks';
import type { Notification } from '@/lib/types/notification.types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
