import { useMemo } from 'react';

export function useConsultationCardDisplay(consultation: any) {
  const formattedDate = useMemo(() => {
    return new Date(consultation.createdAt).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [consultation.createdAt]);

  const clientName = useMemo(() => {
    const firstName = consultation.formData?.firstName || consultation.formData?.prenoms || '';
    const lastName = consultation.formData?.lastName || consultation.formData?.nom || '';
    return `${firstName} ${lastName}`.trim();
  }, [consultation.formData?.firstName, consultation.formData?.lastName, consultation.formData?.prenoms, consultation.formData?.nom]);

  const tierceName = useMemo(() => {
    if (!consultation.tierce) return null;
    return `${consultation.tierce.prenoms || ''} ${consultation.tierce.nom || ''}`.trim();
  }, [consultation.tierce]);

  return { formattedDate, clientName, tierceName };
}
