'use client';
import NumerologieLoadingState from '@/components/numerologie/NumerologieLoadingState';
import NumerologieErrorState from '@/components/numerologie/NumerologieErrorState';
import NumerologyResultClient from '@/components/numerologie/NumerologyResultClient';
import { useNumerologieConsultation } from '@/hooks/commons/useNumerologieConsultation';

interface NumerologiePageProps {
  params: { id: string };
}

export default function NumerologiePage({ params }: NumerologiePageProps) {
  const { id } = params;
  const { consultation, loading, error, fetchConsultation } = useNumerologieConsultation(id);

  if (loading) return <NumerologieLoadingState />;

  if (error) return <NumerologieErrorState error={error} onRetry={fetchConsultation} />;

  if (!consultation) return <NumerologieErrorState error="Aucune donnée disponible" onRetry={fetchConsultation} />;

  return <NumerologyResultClient consultation={consultation} />;
}