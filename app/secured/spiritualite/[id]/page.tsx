'use client';
import SpiritualPracticeError from '@/components/spiritualite/SpiritualPracticeError';
import SpiritualPracticeHeader from '@/components/spiritualite/SpiritualPracticeHeader';
import SpiritualPracticeLoading from '@/components/spiritualite/SpiritualPracticeLoading';
import SpiritualPracticeSections from '@/components/spiritualite/SpiritualPracticeSections';
import { useSpiritualPracticeDetail } from '@/hooks/spiritualite/useSpiritualPracticeDetail';
import { useParams } from 'next/navigation';

export default function SpiritualPracticeDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const { practice, loading, error, expandedSections, toggleSection } = useSpiritualPracticeDetail(slug);

  if (loading) { return <SpiritualPracticeLoading />; }
  if (error) { return <SpiritualPracticeError error={error} />; }
  if (!practice) return null;

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      <SpiritualPracticeHeader practice={practice} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <SpiritualPracticeSections
          practice={practice}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />
      </div>
    </div>
  );
}