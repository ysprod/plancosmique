import { Sparkles, User, Star, TrendingUp, Calendar } from 'lucide-react';
import React from 'react';
import { ConsultationType } from '@/lib/interfaces';

export const TYPE_LABELS: Record<ConsultationType, { label: string; color: string; icon: typeof Star }> = {
  SPIRITUALITE: { label: 'Spiritualité', color: 'from-purple-500 to-pink-500', icon: Sparkles },
  VIE_PERSONNELLE: { label: 'Vie Personnelle', color: 'from-blue-500 to-cyan-500', icon: User },
  RELATIONS: { label: 'Relations', color: 'from-rose-500 to-red-500', icon: Star },
  PROFESSIONNEL: { label: 'Professionnel', color: 'from-green-500 to-emerald-500', icon: TrendingUp },
  OFFRANDES: { label: 'Offrandes', color: 'from-amber-500 to-orange-500', icon: Star },
  ASTROLOGIE_AFRICAINE: { label: 'Astrologie Africaine', color: 'from-yellow-500 to-orange-600', icon: Sparkles },
  HOROSCOPE: { label: 'Horoscope', color: 'from-indigo-500 to-blue-500', icon: Calendar },
  NOMBRES_PERSONNELS: { label: 'Nombres Personnels', color: 'from-amber-500 to-yellow-500', icon: Star },
  CYCLES_PERSONNELS: { label: 'Cycles Personnels', color: 'from-pink-500 to-purple-500', icon: Star },
  CINQ_ETOILES: { label: 'Cinq Étoiles', color: 'from-yellow-500 to-fuchsia-500', icon: Star },
  NUMEROLOGIE: { label: 'Numérologie', color: 'from-blue-500 to-emerald-500', icon: Star },
  AUTRE: { label: 'Autre', color: 'from-gray-400 to-gray-600', icon: Star },
};

export interface TypeBadgeProps {
  type: ConsultationType;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const config = TYPE_LABELS[type];
  const Icon = config.icon;
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r  text-white rounded-lg text-xs font-bold`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </div>
  );
};

export default TypeBadge;
