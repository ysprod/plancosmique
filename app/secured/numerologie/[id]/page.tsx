import NumerologiePageClient from '@/components/secured/numerologie/NumerologiePageClient';

interface NumerologiePageProps {
  params: { id: string };
}

export default function NumerologiePage({ params }: NumerologiePageProps) {
  return <NumerologiePageClient id={params.id} />;
}