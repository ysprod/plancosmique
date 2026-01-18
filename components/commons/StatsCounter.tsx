'use client';
import React from 'react';
import { Users, Eye } from 'lucide-react';
import { StatCard } from './StatCard';
import { ErrorMessage } from './StatsErrorMessage';
import { LoadingSkeleton } from './StatsLoadingSkeleton';
import { useStatsData } from '@/hooks/useStatsData';

const StatsCounter: React.FC = () => {
  const { stats, loading, error, fetchStats } = useStatsData();

  if (loading && !stats) { return <LoadingSkeleton />; }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center py-6">
        <StatCard
          value={stats?.subscribers ?? null}
          label="Abonnés"
          icon={<Users className="w-6 h-6 text-purple-600" />}
          loading={loading}
          color="purple"
        />

        <StatCard
          value={stats?.visits ?? null}
          label="Visites"
          icon={<Eye className="w-6 h-6 text-fuchsia-600" />}
          loading={loading}
          color="fuchsia"
        />
      </div>

      {error && (
        <div className="flex justify-center mt-4">
          <ErrorMessage message={error} onRetry={fetchStats} />
        </div>
      )}
    </div>
  );
};

export default StatsCounter;