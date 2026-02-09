import { useMemo } from 'react';
import { formatDate } from '@/lib/functions';
import type { Consultation } from '@/lib/interfaces';

const useConsultationData = (consultation: Consultation) => {
  return useMemo(() => {
    const formData = consultation.formData;
    const fullName = `${formData?.prenoms || ''} ${formData?.nom || ''}`.trim();
    const birthLocation = [formData?.villeNaissance, formData?.paysNaissance]
      .filter(Boolean)
      .join(', ');
    return {
      fullName,
      birthLocation,
      birthDate: formData?.dateNaissance ? formatDate(formData.dateNaissance) : '—',
      birthTime: formData?.heureNaissance || '—',
      hasResult:  consultation.status === 'COMPLETED',
      createdAt: formatDate(consultation.createdAt),
      completedDate: consultation.completedDate ? formatDate(consultation.completedDate) : null,
      isProcessing: consultation.status === 'processing',
      isFailed: consultation.status === 'failed',
      isCompleted: consultation.status === 'COMPLETED',
    };
  }, [consultation]);
};
export default useConsultationData;
