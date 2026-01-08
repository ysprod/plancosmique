import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';

export function useDomaines() {
  const [domaines, setDomaines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/config/domaines')
      .then(res => setDomaines(res.data))
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  return { domaines, loading, error };
}

export function usePlatformStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/config/stats')
      .then(res => setStats(res.data))
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
}

export function useDomaineConsultations(domaineId: string | null) {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!domaineId) return;
    setLoading(true);
    api.get(`/config/domaines/${domaineId}/consultations`)
      .then(res => setConsultations(res.data))
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [domaineId]);

  return { consultations, loading, error };
}

export function useSousRubriqueConsultations(sousRubriqueId: string | null) {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sousRubriqueId) return;
    setLoading(true);
    api.get(`/config/sous-rubriques/${sousRubriqueId}/consultations`)
      .then(res => setConsultations(res.data))
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [sousRubriqueId]);

  return { consultations, loading, error };
}

export function useConsultation(consultationId: string | null) {
  const [consultation, setConsultation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!consultationId) return;
    setLoading(true);
    api.get(`/config/consultations/${consultationId}`)
      .then(res => setConsultation(res.data))
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [consultationId]);

  return { consultation, loading, error };
}
