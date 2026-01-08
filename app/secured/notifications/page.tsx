'use client';
import NotificationsContainer from '@/components/notifications/NotificationsContainer';
import { useNotificationsPage } from '@/hooks/notifications/useNotificationsPage';

export default function NotificationsPage() {
  const {
    filter, setFilter, unreadCount, markAllAsRead, showSettings, setShowSettings,
    filteredNotifications, isLoading, handleNotificationClick, handleDelete
  } = useNotificationsPage();

  return (
    <NotificationsContainer
      unreadCount={unreadCount}
      markAllAsRead={markAllAsRead}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
      filter={filter}
      setFilter={setFilter}
      filteredNotifications={filteredNotifications}
      isLoading={isLoading}
      onNotificationClick={handleNotificationClick}
      onDelete={handleDelete}
    />
  );
}