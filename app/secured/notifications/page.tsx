'use client';
import NotificationsContainer from '@/components/notifications/NotificationsContainer';
import { useNotificationsPage } from '@/hooks/notifications/useNotificationsPage';

export default function NotificationsPage() {

  const {
    filteredNotifications, showSettings, isLoading, unreadCount, filter,
    setFilter, markAllAsRead, setShowSettings, handleNotificationClick, handleDelete
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