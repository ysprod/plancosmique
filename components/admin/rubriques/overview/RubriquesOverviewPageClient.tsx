'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { RubriquesOverviewDomaines } from '@/components/admin/rubriques/overview/RubriquesOverviewDomaines';
import { RubriquesOverviewStats } from '@/components/admin/rubriques/overview/RubriquesOverviewStats';
import { RubriquesOverviewLoading } from '@/components/admin/rubriques/overview/RubriquesOverviewLoading';
import { RubriquesOverviewError } from '@/components/admin/rubriques/overview/RubriquesOverviewError';
import { useRubriquesOverview } from '@/hooks/rubriques/useRubriquesOverview';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};

const RubriquesOverviewPageClient = memo(function RubriquesOverviewPageClient() {
  const { domaines, stats, loading, error } = useRubriquesOverview();

  if (loading) {
    return <RubriquesOverviewLoading />;
  }

  if (error) {
    return <RubriquesOverviewError error={error} />;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-3 sm:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="mb-6 sm:mb-8 text-center sm:text-left"
        >
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed px-2 sm:px-0">
            Architecture complète de tous les services proposés sur la plateforme
          </p>
        </motion.div>

        <RubriquesOverviewStats stats={stats} />
        <RubriquesOverviewDomaines domaines={domaines} />
      </div>
    </motion.div>
  );
});

export default RubriquesOverviewPageClient;