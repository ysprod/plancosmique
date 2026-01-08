'use client';
import { Flame, BookOpen, Shield, CircleDollarSign, Feather, Sparkle } from 'lucide-react';
import { useParams } from 'next/navigation';
import SpiritualPracticeHeader from '@/components/spiritualite/SpiritualPracticeHeader';
import SpiritualPracticeSections from '@/components/spiritualite/SpiritualPracticeSections';
import { useSpiritualPracticeDetail } from '@/hooks/commons/useSpiritualPracticeDetail';
import SpiritualPracticeLoading from '@/components/spiritualite/SpiritualPracticeLoading';
import SpiritualPracticeError from '@/components/spiritualite/SpiritualPracticeError';

const iconMap: Record<string, React.ReactNode> = {
  'BookOpen': <BookOpen className="w-6 h-6" />,
  'Shield': <Shield className="w-6 h-6" />,
  'CircleDollarSign': <CircleDollarSign className="w-6 h-6" />,
  'Feather': <Feather className="w-6 h-6" />,
  'Sparkle': <Sparkle className="w-6 h-6" />,
  'Flame': <Flame className="w-6 h-6" />,
};

const colorMap: Record<string, string> = {
  'bases': 'from-purple-600 to-indigo-600',
  'protection': 'from-blue-600 to-cyan-600',
  'abondance': 'from-yellow-600 to-amber-600',
  'ancetres': 'from-orange-600 to-red-600',
  'meditations': 'from-pink-600 to-rose-600',
};

export default function SpiritualPracticeDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const { practice, loading, error, expandedSections, toggleSection } = useSpiritualPracticeDetail(slug);

  if (loading) { return <SpiritualPracticeLoading />; }

  if (error) {
    return <SpiritualPracticeError error={error} />;
  }

  if (!practice) return null;

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      <SpiritualPracticeHeader
        title={practice.title}
        description={practice.description}
        icon={iconMap[practice.iconName] || <Flame className="w-8 h-8" />}
        color={colorMap[practice.slug] || 'from-purple-900 to-indigo-900'}
      />
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
