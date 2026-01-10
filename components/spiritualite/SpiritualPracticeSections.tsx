import { BookOpen, Sparkle, Flame, Feather, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  practice: any;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export default function SpiritualPracticeSections({ practice, expandedSections, toggleSection }: Props) {
  return (
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
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['elements'] ? 'rotate-180' : ''}`} />
        </motion.button>
        <AnimatePresence>
          {expandedSections['elements'] && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3">
              {practice.keyElements.map((element: string, idx: number) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-700">{element}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
     
      <section>
        <motion.button onClick={() => toggleSection('guide')} className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all font-semibold text-slate-900">
          <span className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Guide Détaillé
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['guide'] ? 'rotate-180' : ''}`} />
        </motion.button>
        <AnimatePresence>
          {expandedSections['guide'] && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{practice.detailedGuide}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {/* Bienfaits */}
      <section>
        <motion.button onClick={() => toggleSection('benefits')} className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all font-semibold text-slate-900">
          <span className="flex items-center gap-2">
            <Sparkle className="w-5 h-5" />
            Bienfaits
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['benefits'] ? 'rotate-180' : ''}`} />
        </motion.button>
        <AnimatePresence>
          {expandedSections['benefits'] && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {practice.benefits.map((benefit: string, idx: number) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <p className="text-slate-700 text-sm">{benefit}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {/* Étapes Pratiques */}
      <section>
        <motion.button onClick={() => toggleSection('steps')} className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all font-semibold text-slate-900">
          <span className="flex items-center gap-2">
            <Flame className="w-5 h-5" />
            Étapes Pratiques
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['steps'] ? 'rotate-180' : ''}`} />
        </motion.button>
        <AnimatePresence>
          {expandedSections['steps'] && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3">
              {practice.practicalSteps.map((step: string, idx: number) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="font-bold text-orange-600 bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{idx + 1}</span>
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
          <motion.button onClick={() => toggleSection('warnings')} className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl hover:from-red-100 hover:to-rose-100 transition-all font-semibold text-slate-900">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Avertissements
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['warnings'] ? 'rotate-180' : ''}`} />
          </motion.button>
          <AnimatePresence>
            {expandedSections['warnings'] && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3">
                {practice.warnings.map((warning: string, idx: number) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
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
          <motion.button onClick={() => toggleSection('materials')} className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all font-semibold text-slate-900">
            <span className="flex items-center gap-2">
              <Feather className="w-5 h-5" />
              Matériaux Nécessaires
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections['materials'] ? 'rotate-180' : ''}`} />
          </motion.button>
          <AnimatePresence>
            {expandedSections['materials'] && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {practice.materials.map((material: string, idx: number) => (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 flex items-start gap-3">
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
  );
}
