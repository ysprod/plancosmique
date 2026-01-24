import { useMemo } from 'react';
import type { Consultation } from '@/lib/interfaces';

export type ConsultationContentKind = 'numerology' | 'astrology' | 'horoscope' | 'default';

export function useConsultationType(consultation: Consultation | null) {
  return useMemo(() => {
    if (!consultation) return { kind: 'default' as const };
    const type = consultation.type?.toString().toLowerCase();
    if (['nombres-personnels', 'cycles-personnels', 'numerologie'].includes(type)) {
      return { kind: 'numerology' as const };
    }
    if ([
      'vie-personnelle',
      'astrologie-africaine',
      'transits',
      'astrologie',
      'astro',
      'carte-du-ciel',
    ].includes(type)) {
      return { kind: 'astrology' as const };
    }
    if (type === 'horoscope') {
      return { kind: 'horoscope' as const };
    }
    return { kind: 'default' as const };
  }, [consultation]);
}
