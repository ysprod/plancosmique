
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api/client';
import { useParams, useRouter } from 'next/navigation';
import type { AxiosError } from 'axios';
import {
  Flame,
  BookOpen,
  Shield,
  CircleDollarSign,
  Feather,
  Sparkle,
  ChevronDown,
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface SpiritualPractice {
  _id: string;
  slug: string;
  title: string;
  iconName: string;
  category: string;
  published: boolean;
  order?: number;
  description: string;
  introduction: string;
  keyElements: string[];
  detailedGuide: string;
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  affirmation: string;
  materials?: string[];
  bestTiming?: string;
}

interface ApiResponse {
  success: boolean;
  data: SpiritualPractice[];
  count: number;
}

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
  const router = useRouter();
  const slug = params.slug as string;

  const [practice, setPractice] = useState<SpiritualPractice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPractice = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<ApiResponse>('/spiritualite');
        if (data?.data && Array.isArray(data.data)) {
          const found = data.data.find(p => p._id === slug || p.slug === slug);
          if (found) {
            setPractice(found);
          } else {
            setError('Pratique non trouvée');
          }
        }
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        setError(axiosErr?.response?.data?.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchPractice();
  }, [slug]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-700 font-semibold text-lg">{error}</p>
            <button
              onClick={() => router.back()}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retour
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!practice) {
    return null;
  }

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden bg-gradient-to-r ${colorMap[practice.slug] || 'from-purple-900 to-indigo-900'} text-white py-16 px-6`}
      >
        <div className="absolute inset-0 opacity-20">
          <Flame className="absolute w-32 h-32 top-4 right-8 animate-pulse" />
          <Sparkle className="absolute w-24 h-24 bottom-8 left-12 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-orange-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                {iconMap[practice.iconName] || <Flame className="w-8 h-8" />}
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold">{practice.title}</h1>
                <p className="text-xl text-white/80 mt-2">{practice.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden p-12 space-y-8"
        >
          {/* Introduction */}
          <section>
            <p className="text-lg text-slate-700 leading-relaxed italic border-l-4 border-purple-500 pl-6">
              {practice.introduction}
            </p>
          </section>

          {/* Key Elements */}
          <section>
            <motion.button
              onClick={() => toggleSection('elements')}
              className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl hover:from-purple-100 hover:to-orange-100 transition-all font-semibold text-slate-900"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Éléments Clés
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections['elements'] ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {expandedSections['elements'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  {practice.keyElements.map((element, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-slate-700">{element}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Detailed Guide */}
          <section>
            <motion.button
              onClick={() => toggleSection('guide')}
              className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all font-semibold text-slate-900"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Guide Détaillé
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections['guide'] ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {expandedSections['guide'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-6 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {practice.detailedGuide}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Benefits */}
          <section>
            <motion.button
              onClick={() => toggleSection('benefits')}
              className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all font-semibold text-slate-900"
            >
              <span className="flex items-center gap-2">
                <Sparkle className="w-5 h-5" />
                Bienfaits
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections['benefits'] ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {expandedSections['benefits'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {practice.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-start gap-3"
                    >
                      <span className="text-green-600 font-bold text-lg">✓</span>
                      <p className="text-slate-700 text-sm">{benefit}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Practical Steps */}
          <section>
            <motion.button
              onClick={() => toggleSection('steps')}
              className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all font-semibold text-slate-900"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                Étapes Pratiques
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections['steps'] ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {expandedSections['steps'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  {practice.practicalSteps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200"
                    >
                      <span className="font-bold text-orange-600 bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700">{step}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Warnings */}
          {practice.warnings.length > 0 && (
            <section>
              <motion.button
                onClick={() => toggleSection('warnings')}
                className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl hover:from-red-100 hover:to-rose-100 transition-all font-semibold text-slate-900"
              >
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Avertissements
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedSections['warnings'] ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {expandedSections['warnings'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {practice.warnings.map((warning, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex gap-4 p-4 bg-red-50 rounded-lg border border-red-200"
                      >
                        <span className="text-red-600 font-bold flex-shrink-0">⚠</span>
                        <p className="text-slate-700">{warning}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )}

          {/* Materials */}
          {practice.materials && practice.materials.length > 0 && (
            <section>
              <motion.button
                onClick={() => toggleSection('materials')}
                className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all font-semibold text-slate-900"
              >
                <span className="flex items-center gap-2">
                  <Feather className="w-5 h-5" />
                  Matériaux Nécessaires
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedSections['materials'] ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {expandedSections['materials'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {practice.materials.map((material, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 flex items-start gap-3"
                      >
                        <span className="text-indigo-600 font-bold">•</span>
                        <p className="text-slate-700 text-sm">{material}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )}

          {/* Affirmation */}
          <section className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-xl p-8 border-2 border-purple-300">
            <p className="text-center text-lg font-semibold text-purple-900 italic">
              ✨ {practice.affirmation} ✨
            </p>
          </section>

          {/* Best Timing */}
          {practice.bestTiming && (
            <div className="bg-slate-100 rounded-xl p-6 border border-slate-300">
              <p className="text-slate-700">
                <span className="font-semibold">⏰ Meilleur moment: </span>
                {practice.bestTiming}
              </p>
            </div>
          )}
        </motion.article>
      </div>
    </div>
  );
}
