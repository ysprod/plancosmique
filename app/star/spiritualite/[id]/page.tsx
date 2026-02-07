import SpiritualPracticeDetailPageClient from '@/components/secured/spiritualite/SpiritualPracticeDetailPageClient';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function SpiritualPracticeDetailPage({ params }: Params) {
  const { id } = await params;
  return <SpiritualPracticeDetailPageClient slug={id} />;
}