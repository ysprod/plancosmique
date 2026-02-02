import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { Consultation, ConsultationType, ConsultationStatus } from '@/lib/interfaces';

export function useConsultationsListPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ConsultationType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | 'ALL'>('ALL');

  useEffect(() => {
    loadConsultations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadConsultations = async () => {
    try {
      const token = localStorage.getItem('monetoile_access_token');
      if (!token) {
        setError('Vous devez être connecté pour voir vos consultations');
        setLoading(false);
        return;
      }
      const response = await api.get('/consultations/my');
      console.log("Réponse des consultations :", response);
      if (response.status !== 200) {
        throw new Error('Erreur lors du chargement des consultations');
      }

      // const filtered = (response.data.consultations  || []).filter((c: Consultation) =>
      //   c.analysisNotified === true
      // );
      const filtered = response.data.consultations || [];
      setConsultations(filtered);
      setLoading(false);
    } catch (err: any) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
      } else {
        setError('Erreur lors du chargement des consultations');
      }
      setLoading(false);
    }
  };

  const handleView = (id: string) => {
    const consultation = consultations.find(c => c._id === id);
    if (consultation && (consultation.type === 'nombres-personnels' || consultation.type === 'cycles-personnels')) {
      router.push(`/star/numerologie/${id}`);
    } else {
      router.push(`/star/consultations/${id}`);
    }
  };

  const handleDownload = (id: string) => {
    window.open(`/api/consultations/${id}/download-pdf`, '_blank');
  };

  return {
    consultations,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    handleView,
    handleDownload
  };
}