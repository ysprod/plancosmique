import NumerologiePageClient from '@/components/secured/numerologie/NumerologiePageClient';

interface NumerologiePageProps {
  params: Promise<{ id: string }>;
}

export default async function NumerologiePage({ params }: NumerologiePageProps) {
  const { id } = await params;
  return <NumerologiePageClient id={id} />;
}
