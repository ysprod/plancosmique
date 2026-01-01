
'use client';
import { Loader2, Flame, BookOpen, Shield, CircleDollarSign, Feather, Sparkle } from 'lucide-react';
import { useParams } from 'next/navigation';
import SpiritualPracticeHeader from '@/components/spiritualite/SpiritualPracticeHeader';
import SpiritualPracticeSections from '@/components/spiritualite/SpiritualPracticeSections';
import { useSpiritualPracticeDetail } from '@/hooks/useSpiritualPracticeDetail';

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
  const slug = params.slug as string;
  const { practice, loading, error, expandedSections, toggleSection } = useSpiritualPracticeDetail(slug);

  if (loading) {
    return (
      <div className=" bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-semibold">Chargement de la pratique...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className=" bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <span className="inline-block mb-4">
              <Flame className="w-12 h-12 text-red-600 mx-auto" />
            </span>
            <p className="text-red-700 font-semibold text-lg">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
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
