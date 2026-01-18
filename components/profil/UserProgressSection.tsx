'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useUserProfile } from '@/hooks/profil/useUserProfile';
import GradeBadge from './GradeBadge';
import ProfileTypeBadge, { ProfileFeatures } from './ProfileTypeBadge';
import GradeWelcomeMessage from './GradeWelcomeMessage';
import { Grade } from '@/lib/types/grade.types';

interface UserProgressSectionProps {
  userName: string;
  showWelcomeMessage?: boolean;
}

export default function UserProgressSection({ userName, showWelcomeMessage = false }: UserProgressSectionProps) {
  const { gradeProgress, subscription, access, loading, error, refetch } = useUserProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-cosmic-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-900/20 border border-red-500/50 rounded-xl p-6"
      >
        <p className="text-red-400">{error}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </motion.div>
    );
  }

  if (!gradeProgress || !subscription) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Message de bienvenue (optionnel) */}
      {showWelcomeMessage && (
        <GradeWelcomeMessage
          userName={userName}
          grade={gradeProgress.currentGrade}
          isNewGrade={false}
        />
      )}

      {/* Type de profil */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Votre Profil</h2>
        <ProfileTypeBadge
          userType={subscription.userType}
          subscriptionEndDate={subscription.subscriptionEndDate}
        />
        <div className="mt-4">
          <ProfileFeatures userType={subscription.userType} />
        </div>
      </section>

      {/* Grade initiatique */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Votre Grade Initiatique</h2>
        <GradeBadge progress={gradeProgress} showDetails={true} />
      </section>
    </div>
  );
}
