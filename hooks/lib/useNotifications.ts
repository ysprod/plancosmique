'use client';
import { useState, useEffect, useCallback } from 'react';
import { notificationsService } from '@/lib/api/services';
import { useAuth } from './useAuth';
import type { Notification } from '@/lib/types/notification.types';
export function useNotifications(pollingInterval = 300000) {
  // ...existing code...
}
