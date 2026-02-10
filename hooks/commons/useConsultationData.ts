import { useMemo } from 'react';
import { formatDate } from '@/lib/functions';
import type { Consultation } from '@/lib/interfaces';
import { ConsultationStatus } from '@/lib/interfaces';

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
      hasResult:  consultation.status === ConsultationStatus.COMPLETED,
      createdAt: formatDate(consultation.createdAt),
      completedDate: consultation.completedDate ? formatDate(consultation.completedDate) : null,
      isProcessing: consultation.status === ConsultationStatus.PROCESSING,
      isFailed: consultation.status === ConsultationStatus.FAILED,
      isCompleted: consultation.status === ConsultationStatus.COMPLETED,
    };
  }, [consultation]);
};
export default useConsultationData;
