import SpiritualPracticeDetailPageClient from '@/components/secured/spiritualite/SpiritualPracticeDetailPageClient';

interface Params {
  params: { id: string };
}

export default function SpiritualPracticeDetailPage({ params }: Params) {
  return <SpiritualPracticeDetailPageClient slug={params.id} />;
}