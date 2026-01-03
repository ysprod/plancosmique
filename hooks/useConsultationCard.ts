import { useMemo } from 'react';

export function useConsultationCard(consultation: any) {
  const typeConfig = useMemo(() => {
    const configs: Record<string, { icon: string; text: string; gradient: string }> = {
      'NOMBRES_PERSONNELS': { icon: '🔢', text: 'Numérologie', gradient: 'from-emerald-500 to-teal-500' },
      'CYCLES_PERSONNELS': { icon: '🌙', text: 'Cycles', gradient: 'from-purple-500 to-indigo-500' },
      'TAROT': { icon: '🃏', text: 'Tarot', gradient: 'from-indigo-500 to-purple-500' },
      'ASTROLOGIE': { icon: '⭐', text: 'Astrologie', gradient: 'from-blue-500 to-cyan-500' }
    };
    return configs[consultation.type] || {
      icon: '📋',
      text: consultation.type,
      gradient: 'from-gray-500 to-gray-600'
    };
  }, [consultation.type]);

  const hasResultData = useMemo(() => !!consultation.resultData, [consultation.resultData]);
  const hasCarteDuCiel = useMemo(() => !!consultation.formData?.carteDuCiel, [consultation.formData]);

  return { typeConfig, hasResultData, hasCarteDuCiel };
}
