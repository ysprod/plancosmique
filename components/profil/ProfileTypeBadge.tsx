'use client';

import { motion } from 'framer-motion';
import { Crown, Star, Sparkles, Check, Lock } from 'lucide-react';
import { UserType, getUserTypeLabel, getUserTypeDescription } from '@/lib/types/user-profile.types';

interface ProfileTypeBadgeProps {
  userType: UserType;
  subscriptionEndDate?: string;
  premiumRubriqueName?: string;
}

const PROFILE_COLORS: Record<UserType, { bg: string; border: string; icon: string }> = {
  [UserType.BASIQUE]: { bg: 'from-slate-600 to-slate-700', border: 'border-slate-500', icon: '⭐' },
  [UserType.PREMIUM]: { bg: 'from-purple-600 to-purple-700', border: 'border-purple-500', icon: '👑' },
  [UserType.INTEGRAL]: { bg: 'from-amber-600 via-yellow-500 to-amber-600', border: 'border-amber-400', icon: '✨' }
};

export default function ProfileTypeBadge({ userType, subscriptionEndDate, premiumRubriqueName }: ProfileTypeBadgeProps) {
  const label = getUserTypeLabel(userType);
  const description = getUserTypeDescription(userType);
  const colors = PROFILE_COLORS[userType];

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border-2 ${colors.border} shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{colors.icon}</div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{label}</h3>
          <p className="text-white/80 text-sm mb-3">{description}</p>

          {/* Informations spécifiques au type */}
          <div className="space-y-2">
            {userType === UserType.PREMIUM && premiumRubriqueName && (
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Star className="w-4 h-4" />
                <span>Rubrique autorisée : <span className="font-semibold">{premiumRubriqueName}</span></span>
              </div>
            )}

            {subscriptionEndDate && userType !== UserType.BASIQUE && (
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Check className="w-4 h-4" />
                <span>Valable jusqu'au {formatDate(subscriptionEndDate)}</span>
              </div>
            )}

            {userType === UserType.INTEGRAL && (
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Sparkles className="w-4 h-4" />
                <span>Accès illimité à toutes les rubriques</span>
              </div>
            )}
          </div>
        </div>

        {userType !== UserType.BASIQUE && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Crown className="w-6 h-6 text-yellow-300" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

interface ProfileFeaturesProps {
  userType: UserType;
}

export function ProfileFeatures({ userType }: ProfileFeaturesProps) {
  const features = {
    [UserType.BASIQUE]: [
      { text: 'Accès aux contenus gratuits', available: true },
      { text: 'Consultations payantes à l\'unité', available: true },
      { text: 'Historique de vos consultations', available: true },
      { text: 'Accès illimité à une rubrique', available: false },
      { text: 'Accès à toutes les rubriques', available: false }
    ],
    [UserType.PREMIUM]: [
      { text: 'Tous les avantages Basique', available: true },
      { text: 'Accès illimité à une rubrique', available: true },
      { text: 'Valable 12 mois', available: true },
      { text: 'Badge Premium', available: true },
      { text: 'Accès à toutes les rubriques', available: false }
    ],
    [UserType.INTEGRAL]: [
      { text: 'Tous les avantages Premium', available: true },
      { text: 'Accès illimité à toutes les rubriques', available: true },
      { text: 'Accès prioritaire aux nouveautés', available: true },
      { text: 'Badge Intégral exclusif', available: true },
      { text: 'Valable 12 mois', available: true }
    ]
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-cosmic-purple" />
        Avantages de votre profil
      </h4>
      
      <ul className="space-y-3">
        {features[userType].map((feature, index) => (
          <motion.li
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            {feature.available ? (
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            ) : (
              <Lock className="w-5 h-5 text-slate-500 flex-shrink-0" />
            )}
            <span className={feature.available ? 'text-slate-200' : 'text-slate-500'}>
              {feature.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
