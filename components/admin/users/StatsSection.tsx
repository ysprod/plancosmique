'use client';
import UsersStats from '@/components/admin/users/UsersStats';
import { memo } from 'react';

interface StatsSectionProps {
  stats: any;
}

export const StatsSection = memo(function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div            className="flex justify-center"    >
      {stats && <UsersStats stats={stats} />}
    </div>
  );
});