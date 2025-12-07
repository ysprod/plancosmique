'use client';

import { useState, useEffect, useCallback } from 'react';
import { notificationsService } from '@/lib/api/services';
import type { Notification } from '@/types/notification.types';

export function useNotifications(pollingInterval: number = 30000) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setError(null);
      const data = await notificationsService.getUnreadNotifications();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des notifications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationsService.markAsRead(notificationId);
      setNotifications(prev => prev.map(n => 
        n._id === notificationId ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Erreur lors du marquage de la notification:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Erreur lors du marquage de toutes les notifications:', err);
    }
  }, []);

  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      const notification = notifications.find(n => n._id === notificationId);
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Erreur lors de la suppression de la notification:', err);
    }
  }, [notifications]);

  // Polling pour récupérer les nouvelles notifications
  useEffect(() => {
    fetchNotifications();
    
    if (pollingInterval > 0) {
      const interval = setInterval(fetchNotifications, pollingInterval);
      return () => clearInterval(interval);
    }
  }, [fetchNotifications, pollingInterval]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
