'use client';
import NotificationsContainer from '@/components/notifications/NotificationsContainer';
import { useNotificationsPage } from '@/hooks/notifications/useNotificationsPage';

export default function NotificationsPage() {

  const {
    isLoading, unreadCount, filter, setFilter, markAllAsRead, setShowSettings,
    filteredNotifications, showSettings, handleNotificationClick, handleDelete
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