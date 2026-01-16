'use client';

import NotificationHeader from '@/components/notifications/NotificationHeader';
import NotificationFilterBar from '@/components/notifications/NotificationFilterBar';
import NotificationList from '@/components/notifications/NotificationList';
import NotificationSettingsModal from '@/components/notifications/NotificationSettingsModal';
import type { Notification } from '@/lib/types/notification.types';

interface NotificationsContainerProps {
  unreadCount: number;
  markAllAsRead: () => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  filter: string;
  setFilter: (filter: string) => void;
  filteredNotifications: Notification[];
  isLoading: boolean;
  onNotificationClick: (notification: Notification) => void;
  onDelete: (notificationId: string) => void;
}

export default function NotificationsContainer({
  unreadCount,
  markAllAsRead,
  showSettings,
  setShowSettings,
  filter,
  setFilter,
  filteredNotifications,
  isLoading,
  onNotificationClick,
  onDelete
}: NotificationsContainerProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
          onNotificationClick={onNotificationClick}
          onDelete={onDelete}
        />
      </div>
      <NotificationSettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
