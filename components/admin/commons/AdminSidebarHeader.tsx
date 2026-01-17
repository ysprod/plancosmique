'use client';
import React from 'react';
import { Shield } from 'lucide-react';

export const AdminSidebarHeader = React.memo(function AdminSidebarHeader({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
        <Shield className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-sm font-black text-gray-900 dark:text-white">Admin Panel</h2>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{user?.username || 'Administrateur'}</p>
      </div>
    </div>
  );
});