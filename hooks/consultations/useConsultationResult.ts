import { api } from '@/lib/api/client';
import { Consultation } from '@/lib/interfaces';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useConsultationResult() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [consultation, setConsultation] = useState<Consultation | null>(null);

  useEffect(() => {
    if (!consultationId) return;
    const loadConsultation = async () => {
      try {
        const response = await api.get(`/consultations/${consultationId}`);
        if (response.status !== 200) throw new Error('Consultation non trouvée');
        const data = response.data;
        const base = data.consultation;
        let finalConsultation = base;
        if (base.status !== "COMPLETED") {
          try {
            const generatedRes = await api.post(`/consultations/${consultationId}/generate-analysis-user`);
            finalConsultation = generatedRes?.data?.consultation ?? generatedRes?.data ?? null;
            if (!finalConsultation) throw new Error("La consultation générée est introuvable");
          } catch (err: any) {
            throw new Error("Erreur lors de la génération de l'analyse utilisateur");
          }
        }


        setConsultation(finalConsultation);
        setLoading(false);
      } catch (err) {
        setError('Impossible de récupérer la consultation');
        setLoading(false);
      }
    };
    loadConsultation();
  }, [consultationId]);

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('retour') === 'cinqportes') {
        router.push('/secured/cinqportes');
        return;
      }
    }
    router.push('/secured/consultations');
  }, [router]);

  const handleDownloadPDF = useCallback(() => {
    const url = `/api/consultations/${consultationId}/download-pdf`;
    window.open(url, '_blank');
  }, [consultationId]);

  return { loading, error, consultation, handleBack, handleDownloadPDF };
}
