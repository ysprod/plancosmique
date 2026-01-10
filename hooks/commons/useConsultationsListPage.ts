import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { Consultation, ConsultationType, ConsultationStatus } from '@/lib/interfaces';

export function useConsultationsListPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ConsultationType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | 'ALL'>('ALL');

  useEffect(() => {
    loadConsultations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterConsultations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultations, searchQuery, typeFilter, statusFilter]);

  const loadConsultations = async () => {
    try {
      const token = localStorage.getItem('monetoile_access_token');
      if (!token) {
        setError('Vous devez être connecté pour voir vos consultations');
        setLoading(false);
        return;
      }
      const response = await api.get('/consultations/my');
      if (response.status !== 200) {
        throw new Error('Erreur lors du chargement des consultations');
      }
      const data = response.data;
      const filtered = (data.consultations || []).filter((c: any) => c.type !== 'HOROSCOPE');
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

  const filterConsultations = () => {
    if (!Array.isArray(consultations)) {
      setFilteredConsultations([]);
      return;
    }
    let filtered = [...consultations];
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.formData?.prenoms && c.formData.prenoms.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.formData?.nom && c.formData.nom.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(c => c.type === typeFilter);
    }
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    setFilteredConsultations(filtered);
  };

  const handleView = (id: string) => {
    const consultation = consultations.find(c => c._id === id);
    if (consultation && (consultation.type === 'nombres-personnels' || consultation.type === 'cycles-personnels')) {
      router.push(`/secured/numerologie/${id}`);
    } else {
      router.push(`/secured/consultations/${id}`);
    }
  };

  const handleDownload = (id: string) => {
    window.open(`/api/consultations/${id}/download-pdf`, '_blank');
  };

  return {
    consultations,
    filteredConsultations,
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
